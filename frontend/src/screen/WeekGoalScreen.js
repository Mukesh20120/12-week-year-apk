import {Keyboard, View, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, Button, TextInput} from 'react-native-paper';
import {generateId, getWeekStartAndEnd,getDateInDDMMYY} from '../utils/generateFunctions';
import WeekIcon from '../component/WeekIcon';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import RenderList from '../component/RenderList';
import Slider from '@react-native-community/slider';
import { createMonthGoalApi, deleteMonthGoalApi, getMonthGoalApi, updateMonthGoalApi } from '../service/api';
import InputBox from '../component/InputBox';


const WeekGoalScreen = ({route,navigation: {navigate}}) => {
  const {monthId,yearId,startMonth,endMonth} = route.params;

  const dayOfWeek = 2;


  const start = getDateInDDMMYY(new Date(startMonth));
  const end = getDateInDDMMYY(new Date(endMonth));

  
  const [taskList, setTaskList] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const [updateId,setUpdateId] = useState(null);
  const [text,setText] = useState('');
  const [priority,setPriority] = useState(0);

  const getGoalData = async () => {
    try {
      const queryData = {
        monthId,
        yearId
      }
      const res = await getMonthGoalApi({queryData});
      setTaskList(res.data.allGoal);
    } catch (error) {
      Alert.alert('Error', 'Not able to fetch the year goal list');
      setTaskList([]);
    }
  };
  useEffect(() => {
    getGoalData();
  }, []);
  //handle adding in list
  const handleOnAddPress = 
    async (inputText, value) => {
      if (inputText !== '') {
        try {
          if (updateId !== null) {
            const newTask = {
              goalId: updateId,
              task: inputText,
              value,
            };
            const res = await updateMonthGoalApi({updateData: newTask});
          } else {
            const newTask = {
              yearId,
              monthId,
              task: inputText,
              value,
            };
            const res = await createMonthGoalApi({newData: newTask});
          }
        } catch (error) {
          Alert.alert('Error', error.message);
        }
        finally{
          setUpdateId(null);
          setText('');
          setPriority(0);
          getGoalData();
        }
      }
    };

  //check mark function
  const handleCheckPressed = useCallback(async({id, done}) => {
      try{
       const newData = {
        goalId: id,
        done
       }
        await updateMonthGoalApi({updateData: newData});
        getGoalData();
      }catch(error){
        Alert.alert('Error',error.message);
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
          onPress: async() => {
            try{
              await deleteMonthGoalApi({goalId: id});
              getGoalData();
            }catch(error){
               Alert.alert('Error',error.message);
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
    <View style={{height: '100%', display: 'flex',backgroundColor: 'white',marginHorizontal:5}}>
      {/* header */}
      <View style={{marginVertical: 10}}>
        <Text variant="headlineMedium" style={{textAlign: 'center'}}>
          This Month Goal
        </Text>
        <Text
          variant="titleMedium"
          style={{textAlign: 'center'}}>{`(${start}-${end}) week`}</Text>
      </View>

     {/* days of week left */}
      <View style={{marginBottom: 10}}>
        <WeekIcon fill={dayOfWeek} />
      </View>
      
     {/* week review button */}
     <View style={{marginHorizontal: 10,marginBottom: 10}}>
      <Button mode="contained-tonal" onPress={()=>{navigate('allDays')}} style={{elevation: 2}}>
       Days Review
      </Button>
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

export default WeekGoalScreen;
