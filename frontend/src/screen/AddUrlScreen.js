import {View, Text} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../component/ScreenWrapper';
import {TextInput} from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addLocalUrl } from '../store/redux';

const AddUrlScreen = ({navigation: {navigate}}) => {
  const [url, setUrl] = useState('http://192.168.117.181:5000/api/v1');
  const dispatch = useDispatch();

  const handleSubmitButton = () => {
      dispatch(addLocalUrl({url}));
      setUrl('');
      navigate('login')
  }
  return (
    <ScreenWrapper>
      <View style={{justifyContent: 'center',alignItems: 'center',height: '100%'}}>
        <TextInput
          label="Enter last ip address number"
          value={url}
          style={{width: '100%',marginVertical: 10}}
          onChangeText={url => setUrl(url)}
        />
        <Button
          mode="contained"
          onPress={() =>{handleSubmitButton()}}>
          Submit
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default AddUrlScreen;
