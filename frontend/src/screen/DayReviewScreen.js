import {Alert, Keyboard, View} from 'react-native';
import React, {useState} from 'react';
import {Text, Button, TextInput} from 'react-native-paper';
import {generateId, getDateInDDMMYY} from '../utils/generateFunctions';
import RenderList from '../component/RenderList';
import Slider from '@react-native-community/slider';

const dummyData = [
  {
    done: false,
    id: '75sfv4m1719404924720',
    task: '2 question leetcode',
    value: 5,
  },
  {done: false, id: 'ag1v30p1719405310995', task: 'java security', value: 7},
  {
    done: false,
    id: 'ag1v30p1719405310935',
    task: 'create todo list page',
    value: 8,
  },
];

const DayReviewScreen = () => {
  const date = new Date();
  const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(
    date,
  );
  const todayDate = getDateInDDMMYY(date);

  const [taskList, setTaskList] = useState(dummyData);
  const [inputText, setInputText] = useState('');
  const [value, setValue] = useState(0);
  const [updateId, setUpdateId] = useState(null);
  const [showInputBox, setShowInputBox] = useState(false);

  // adding,updating, function
  const handleOnAddPress = () => {
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
  };
  //check mark function
  const handleCheckPressed = ({id, idx}) => {
    let newTaskList = [...taskList];
    newTaskList[idx].done = !newTaskList[idx].done;
    setTaskList(newTaskList);
  };
 //update function
  const handleOnUpdate = ({id, idx}) => {
    const taskObject = taskList[idx];
    setInputText(taskObject.task);
    setValue(taskObject.value);
    setShowInputBox(true);
    setUpdateId(id);
  };
 //delete task on long press
  const handleLongPress = ({id, idx}) => {
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
  };

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
      <View>
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

export default DayReviewScreen;
