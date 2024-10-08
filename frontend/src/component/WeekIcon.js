import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {generateId} from '../utils/generateFunctions';

const {height, width} = Dimensions.get('window');
const hp = height / 100;
const wp = width / 100;


const WeekIcon = ({fill}) => {
    const daysOfWeek = [
    {day: 'Mon', color: '#FF5733'},
    {day: 'Tue', color: '#33FF57'},
    {day: 'Wed', color: '#3357FF'},
    {day: 'Thu', color: '#FF33A1'},
    {day: 'Fri', color: '#33FFA1'},
    {day: 'Sat', color: '#A133FF'},
    {day: 'Sun', color: '#FFA133'},
  ];
 
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {daysOfWeek.map((item, idx) => (
        <View
          style={{
            marginHorizontal: 5,
            backgroundColor:
              fill > idx ? 'gray' : item.color,
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
            {item.day}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default React.memo(WeekIcon);
