import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {generateId} from '../utils/generateFunctions';

const {height, width} = Dimensions.get('window');
const hp = height / 100;
const wp = width / 100;


const MonthIcon = ({fill=2}) => {
  const monthsWithColors = [
    { month: '1 Month', color: '#E57373' }, // Red
    { month: '2 Month', color: '#FFB74D' }, // Orange
    { month: '3 Month', color: '#FFF176' }, // Yellow
    { month: '4 Month', color: '#81C784' }, // Green
    { month: '5 Month', color: '#64B5F6' }, // Blue
    { month: '6 Month', color: '#F06292' }, // Pink
    { month: '7 Month', color: '#9575CD' }, // Purple
    { month: '8 Month', color: '#BA68C8' }, // Lavender
    { month: '9 Month', color: '#FFD54F' }, // Amber
    { month: '10 Month', color: '#4FC3F7' }, // Sky Blue
    { month: '11 Month', color: '#4DB6AC' }, // Teal
    { month: '12 Month', color: '#AED581' }  // Lime
];

 
  return (
    <View
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {monthsWithColors.map((item, idx) => (
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
            {/* {item.month} */}
            {idx + 1}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default React.memo(MonthIcon);
