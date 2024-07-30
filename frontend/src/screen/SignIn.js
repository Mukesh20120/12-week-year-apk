import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../component/ScreenWrapper';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import {createApiInstance} from '../service';
import { useDispatch } from 'react-redux';
import { addToken } from '../store/redux';

const SignIn = ({navigation: {navigate}}) => {
  const api = createApiInstance();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleOnPress = async () => {
    try {
      const res = await api.post('/auth/login', loginData);
      const {success,message,token} = res.data;
     if(success){
       dispatch(addToken({token}));
      //  Alert.alert('Success',message);
       navigate('allYear')
      }
    } catch (error) {
      if (error.response && error.response.data)
        Alert.alert('Error', error.response.data.message);
    }
    setLoginData({
      email: '',
      password: '',
    });
  };

  return (
    <ScreenWrapper>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
          Log In
        </Text>
        <TextInput
          label="Email"
          value={loginData.email}
          style={{width: '100%', marginVertical: 10}}
          onChangeText={c => setLoginData(prev => ({...prev, email: c}))}
        />
        <TextInput
          label="Password"
          value={loginData.password}
          style={{width: '100%', marginVertical: 10}}
          onChangeText={c => setLoginData(prev => ({...prev, password: c}))}
        />
        <Button
          mode="contained"
          onPress={() => {
            handleOnPress();
          }}>
          Submit
        </Button>
        <Text>
          Doesn't have account?
          <Text
            style={{fontWeight: 'bold', color: 'red'}}
            onPress={() => {
              navigate('register');
            }}>
            Register
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default SignIn;
