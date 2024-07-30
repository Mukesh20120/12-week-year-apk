import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../component/ScreenWrapper';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import { createApiInstance } from '../service';


const Register = ({navigation: {navigate}}) => {
  const api = createApiInstance();
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const handleOnPress = async() => {
    try{
      const res = await api.post('/auth/signup',registerData);
      console.log(res.data);
    }catch(error){
      Alert.alert('Error',error.message);
    }
    setRegisterData({
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
         Register New Account
        </Text>
        <TextInput
          label="Email"
          value={registerData.email}
          style={{width: '100%', marginVertical: 10}}
          onChangeText={c => setRegisterData(prev => ({...prev, email: c}))}
        />
        <TextInput
          label="Password"
          value={registerData.password}
          style={{width: '100%', marginVertical: 10}}
          onChangeText={c => setRegisterData(prev => ({...prev, password: c}))}
        />
        <Button
          mode="contained"
          onPress={() => {
            handleOnPress();
          }}>
          Submit
        </Button>
        <Text>
          Already have account?
          <Text style={{fontWeight: 'bold', color: 'red'}} onPress={()=>{navigate('login')}}>Login</Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Register;
