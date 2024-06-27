import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {generateId} from '../utils/generateFunctions';

const {height, width} = Dimensions.get('window');
const hp = height / 100;
const wp = width / 100;


const WeekIcon = ({fill}) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
 
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {daysOfWeek.map((day, idx) => (
        <View
          style={{
            marginHorizontal: 5,
            backgroundColor:
              fill >= idx ? (fill == idx ? 'green' : 'gray') : 'yellow',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: hp*5,
            width: hp*5,
            borderRadius: hp*2.5,
            elevation: 1
          }}
          key={generateId()}>
          <Text
            style={{
              padding: 10,
              color: 'black',
              fontWeight: fill > idx ? 'none' : 'bold',
              textDecorationLine: fill > idx ? 'line-through' : 'none',
            }}>
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default React.memo(WeekIcon);
