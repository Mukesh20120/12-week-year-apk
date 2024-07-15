import {Keyboard, View, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, Button, TextInput} from 'react-native-paper';
import {generateId} from '../utils/generateFunctions';
import Slider from '@react-native-community/slider';
import axios from 'axios';

const InputBox = ({
  showInputBox = false,
  priority,
  text,
  handleOnAddPress,
  toggleInputBox,
}) => {
  const [inputText, setInputText] = useState(text);
  const [value, setValue] = useState(priority);

  useEffect(() => {
    setInputText(text);
    setValue(priority);
  }, [text, priority]);

  const handleButtonPress = () => {
    handleOnAddPress(inputText, value);
    setInputText('');
    setValue(0);
    Keyboard.dismiss();
  };
  return (
    <View style={{marginHorizontal: 10}}>
      {showInputBox && (
        <>
          <TextInput
            mode="flat"
            value={inputText}
            placeholder="what will you do today"
            onChangeText={t => setInputText(t)}
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
          if (showInputBox) handleButtonPress();
          toggleInputBox(prev => !prev);
        }}>
        Add Task
      </Button>
    </View>
  );
};

export default InputBox;
