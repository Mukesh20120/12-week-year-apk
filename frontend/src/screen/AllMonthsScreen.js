import React, {useMemo} from 'react';
import {Dimensions, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  generate12Weeks,
} from '../utils/generateFunctions';

const AllMonthsScreen = ({route,navigation: {navigate}}) => {
  const {startMonth='2024-04-29'} = route.params
  // const startWeekDate = '2024-04-29';
  const allMonthsData =  generate12Weeks(startMonth);
  const start = allMonthsData[0].formatStartDate;
  const end = allMonthsData[11].formatEndDate;

  const {height} = Dimensions.get('window');
  const hp = height / 100;

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
          All Month Score
        </Text>
        <Text
          variant="titleMedium"
          style={{textAlign: 'center'}}>{`(${start} to ${end}) week`}</Text>
        <Text variant="titleSmall" style={{textAlign: 'center'}}>
          This Year scores
        </Text>
      </View>

      {/* all month of year */}
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {allMonthsData.map((item, index) => (
            <Pressable
              onPress={() => {
                navigate('weeklyGoal');
              }}
              style={{
                width: '45%',
                backgroundColor: item.color,
                height: hp * 18,
                marginHorizontal: 'auto',
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                elevation: 2,
              }}
              key={index}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>{item.month}</Text>
              <Text style={{fontWeight: 'bold'}}>{item.formatStartDate}</Text>
              <Text style={{fontWeight: 'bold'}}>to</Text>
              <Text style={{fontWeight: 'bold'}}>{item.formatEndDate}</Text>
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
      </ScrollView>
    </View>
  );
};

export default AllMonthsScreen;
