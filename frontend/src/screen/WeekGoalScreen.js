import {Keyboard, View, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, Button, TextInput} from 'react-native-paper';
import {generateId, getWeekStartAndEnd,getDateInDDMMYY} from '../utils/generateFunctions';
import WeekIcon from '../component/WeekIcon';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import RenderList from '../component/RenderList';
import Slider from '@react-native-community/slider';


const WeekGoalScreen = ({navigation: {navigate}}) => {

  const getDayOfWeek = () => {
    const currentDate = new Date();
    return (currentDate.getDay() + 6) % 7;
  };
  const dayOfWeek = getDayOfWeek();

  const {startOfWeek, endOfWeek} = getWeekStartAndEnd();
  const start = getDateInDDMMYY(startOfWeek);
  const end = getDateInDDMMYY(endOfWeek);

  
  const [taskList, setTaskList] = useState([]);
  const [inputText, setInputText] = useState('');
  const [value, setValue] = useState(0);
  const [updateId, setUpdateId] = useState(null);
  const [showInputBox, setShowInputBox] = useState(false);


  useEffect(()=>{
    const getGoalData =async () => {
      try{
       const dataString = await AsyncStorage.getItem('weeklyGoal');
       const res = dataString!==null?JSON.parse(dataString):[];
       setTaskList(res);
      }catch(error){
        Alert.alert('Error',"Something went wrong");
      }
    }
     getGoalData();
  },[]);

  useEffect(()=>{
    const setGoalData = async () => {
      try{
        const newData = JSON.stringify(taskList);
       await AsyncStorage.removeItem('weeklyGoal');
       await AsyncStorage.setItem('weeklyGoal', newData);
      }catch(error){
        Alert.alert('Error',"Something went wrong");
      }
    }
     setGoalData();
  },[taskList]);


  // adding,updating, function
  const handleOnAddPress = useCallback(() => {
    if (updateId !== null && inputText !== '') {
      let newArray = taskList.map(item =>
        item.id === updateId ? {...item, task: inputText, value} : item,
      );
      newArray.sort((a, b) => b.value - a.value);
      setTaskList(newArray);
      setUpdateId(null);
    } else if (inputText !== '') {
      const newTask = {
        id: generateId(),
        task: inputText,
        value,
        done: false,
      };
      let newArray = [...taskList, newTask];
      newArray.sort((a, b) => b.value - a.value);
      setTaskList(newArray);
    }
    setInputText('');
    setValue(0);
    Keyboard.dismiss();
  });
  //check mark function
  const handleCheckPressed = useCallback(({id, idx}) => {
    let newTaskList = [...taskList];
    newTaskList[idx].done = !newTaskList[idx].done;
    setTaskList(newTaskList);
  });
 //update function
  const handleOnUpdate = useCallback(({id, idx}) => {
    const taskObject = taskList[idx];
    setInputText(taskObject.task);
    setValue(taskObject.value);
    setShowInputBox(true);
    setUpdateId(id);
  });
 //delete task on long press
  const handleLongPress = useCallback(({id, idx}) => {
    const deleteTask = taskList[idx];
    Alert.alert(
      'Alert',
      `Do you want to delete task:- ${deleteTask.task} & carry value ${deleteTask.value} ?`,
      [
        {text: 'cancel', style: 'cancel'},
        {
          text: 'ok',
          onPress: () => {
            const newArray = taskList.filter(item => item.id != id);
            setTaskList(newArray);
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
      <View style={{marginHorizontal: 10}}>
        {showInputBox && (
          <>
            <TextInput
              mode="flat"
              value={inputText}
              placeholder="what will you do today"
              onChangeText={text => setInputText(text)}
              style={{elevation: 2, marginBottom: 5, fontSize: 22}}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Slider
                style={{width: '90%', height: 40, marginBottom: 5}}
                minimumValue={0}
                maximumValue={10}
                value={value}
                step={1}
                onValueChange={val => setValue(val)}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#808080"
              />
              <Text variant="headlineSmall">{value}</Text>
            </View>
          </>
        )}

        <Button
          mode="contained"
          style={{elevation: 2}}
          onPress={() => {
          if(showInputBox)
            handleOnAddPress();
          setShowInputBox(prev=>!prev);
          }}>
          Add Task
        </Button>
      </View>

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
