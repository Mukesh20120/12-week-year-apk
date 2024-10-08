import {Alert, View} from 'react-native';
import React, {useState,useEffect,useCallback} from 'react';
import {Text} from 'react-native-paper';
import {getDateInDDMMYY} from '../utils/generateFunctions';
import RenderList from '../component/RenderList';
import InputBox from '../component/InputBox';
import { createApiInstance } from '../service';


const DayGoalScreen = ({route}) => {
  const {dayId,monthId,yearId,date,day:dayName} = route.params;
  const todayDate = getDateInDDMMYY(new Date(date));

  const [taskList, setTaskList] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(0);
  const api = createApiInstance();

  const getGoalData = async () => {
    try {
      const queryData = {
        monthId,
        yearId,
        dayId
      };
      const res = await api.get(`/day/goal`,{params: queryData});
      setTaskList(res.data.allGoal);
    } catch (error) {
      Alert.alert('Error', error.message);
      setTaskList([]);
    }
  };
  useEffect(() => {
    getGoalData();
  }, []);
  //handle adding in list
  const handleOnAddPress = async (inputText, value) => {
    if (inputText !== '') {
      try {
        if (updateId !== null) {
          const newTask = {
            goalId: updateId,
            task: inputText,
            value,
          };
          const res = await api.put('/day/goal',newTask);
        } else {
          const newTask = {
            yearId,
            monthId,
            dayId,
            task: inputText,
            value,
          };
          const res = await api.post('/day/goal',newTask);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setUpdateId(null);
        setText('');
        setPriority(0);
        getGoalData();
      }
    }
  };

  //check mark function
  const handleCheckPressed = useCallback(async ({id, done}) => {
    try {
      const newData = {
        goalId: id,
        done,
      };
      await await api.put('/day/goal',newTask);
      getGoalData();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  });
  //update function
  const handleOnUpdate = useCallback(({id, text, value}) => {
    setShowInputBox(true);
    setText(text);
    setPriority(value);
    setUpdateId(id);
  });
  //delete task on long press
  const handleLongPress = useCallback(({id, txt, pri}) => {
    Alert.alert(
      'Alert',
      `Do you want to delete task:-${txt} & carry value ${pri}`,
      [
        {text: 'cancel', style: 'cancel'},
        {
          text: 'ok',
          onPress: async () => {
            try {
              await api.delete(`/day/goal?goalId=${id}`);
              getGoalData();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  });


  return (
    <View style={{height: '100%', display: 'flex', marginHorizontal: 10}}>
      {/* header */}
      <View style={{marginVertical: 10}}>
        <Text variant="headlineMedium" style={{textAlign: 'center'}}>
          Today Task
        </Text>
        <Text variant="titleSmall" style={{textAlign: 'center'}}>
          {todayDate} & {dayName}
        </Text>
      </View>

      {/* input box and add button */}
      <InputBox
        handleOnAddPress={handleOnAddPress}
        showInputBox={showInputBox}
        toggleInputBox={setShowInputBox}
        text={text}
        priority={priority}
      />

      {/* render the list */}
      <View>
        <RenderList
          data={taskList}
          handleCheckPressed={handleCheckPressed}
          handleOnUpdate={handleOnUpdate}
          handleDelete={handleLongPress}
        />
      </View>
    </View>
  );
};

export default DayGoalScreen;
