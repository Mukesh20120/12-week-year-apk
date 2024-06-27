import React from 'react';
import {Dimensions, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  getDateInDDMMYY,
  getDatesBetween,
  getWeekStartAndEnd,
  reverseString,
} from '../utils/generateFunctions';

const AllDaysScreen = ({navigation: {navigate}}) => {
  const getDayOfWeek = () => {
    const currentDate = new Date();
    return (currentDate.getDay() + 6) % 7;
  };
  const dayOfWeek = getDayOfWeek();

  const {startOfWeek, endOfWeek} = getWeekStartAndEnd();
  const start = getDateInDDMMYY(startOfWeek);
  const end = getDateInDDMMYY(endOfWeek);

  const {height, width} = Dimensions.get('window');
  const hp = height / 100;
  const wp = width / 100;

  const dates = getDatesBetween(startOfWeek, endOfWeek);
  const days = [
    {day: 'Mon', color: '#FF5733'},
    {day: 'Tue', color: '#33FF57'},
    {day: 'Wed', color: '#3357FF'},
    {day: 'Thu', color: '#FF33A1'},
    {day: 'Fri', color: '#33FFA1'},
    {day: 'Sat', color: '#A133FF'},
    {day: 'Sun', color: '#FFA133'},
  ];
  const dayAndDate = days.map((day, index) => ({...day, date: dates[index]}));
  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        marginHorizontal: 10,
        backgroundColor: 'white',
      }}>
      {/* header */}
      <View style={{marginVertical: 20}}>
        <Text variant="headlineLarge" style={{textAlign: 'center'}}>
          All Day Score
        </Text>
        <Text
          variant="titleMedium"
          style={{textAlign: 'center'}}>{`(${start} to ${end}) week`}</Text>
        <Text variant="titleSmall" style={{textAlign: 'center'}}>
          This month (week) score
        </Text>
      </View>

      {/* all days of week */}
      <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        {dayAndDate.map((item, index) => (
          <Pressable
            onPress={()=>{navigate('dayReview')}}
            style={{
              width: '45%',
              backgroundColor: dayOfWeek > index ? 'gray' : item.color,
              height: hp * 18,
              marginHorizontal: 'auto',
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              elevation: 2,
            }}
            key={index}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{item.day}</Text>
            <Text style={{fontWeight: 'bold'}}>{item.date}</Text>
            <View
              style={{
                marginVertical: 5,
                height: hp * 5,
                width: hp * 5,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: hp * 2.5,
                elevation: 2,
              }}>
              <Text style={{fontWeight: 'bold'}}>100</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default AllDaysScreen;
