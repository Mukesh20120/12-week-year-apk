import {View, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, Button} from 'react-native-paper';
import { getDateInDDMMYY} from '../utils/generateFunctions';
import RenderList from '../component/RenderList';
import MonthIcon from '../component/MonthIcon';
import ScreenWrapper from '../component/ScreenWrapper';
import InputBox from '../component/InputBox';
import { createApiInstance } from '../service';


const YearGoalScreen = ({route, navigation: {navigate}}) => {
  const {
    startYear = '00-00-0000',
    endYear = '00-00-0000',
    yearId,
  } = route.params;
  const start = getDateInDDMMYY(new Date(startYear));
  const end = getDateInDDMMYY(new Date(endYear));

  const [taskList, setTaskList] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const [updateId,setUpdateId] = useState(null);
  const [text,setText] = useState('');
  const [priority,setPriority] = useState(0);
  const api = createApiInstance();

  const getGoalData = async () => {
    try {
      const res = await api.get(`/year/goal?yearId=${yearId}`);
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
            const res = await api.put('/year/goal',newTask);
            // Alert.alert('success', res.data.message);
          } else {
            const newTask = {
              yearId,
              task: inputText,
              value,
            };
            const res = await api.post('/year/goal',newTask);
            // Alert.alert('success', res.data.message);
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
       await api.put('/year/goal',newData);
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
              await api.delete(`/year/goal?goalId=${id}`);
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
    <ScreenWrapper>
      {/* header */}
      <View style={{marginVertical: 10}}>
        <Text variant="headlineMedium" style={{textAlign: 'center'}}>
          This Year Goal
        </Text>
        <Text
          variant="titleMedium"
          style={{textAlign: 'center'}}>{`(${start}-${end}) week`}</Text>
      </View>
      {/* <Text>{JSON.stringify(taskList)}</Text> */}
      {/* days of week left */}
      <View style={{marginBottom: 10}}>
        <MonthIcon />
      </View>

      {/* week review button */}
      <View style={{marginHorizontal: 10, marginBottom: 10}}>
        <Button
          mode="contained-tonal"
          onPress={() => {
            navigate('allMonths', {startMonth: startYear,yearId});
          }}
          style={{elevation: 2}}>
          Months Review
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
    </ScreenWrapper>
  );
};

export default YearGoalScreen;
