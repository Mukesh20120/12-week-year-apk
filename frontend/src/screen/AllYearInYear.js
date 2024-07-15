import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Dimensions, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {generate12Weeks, getAllYear} from '../utils/generateFunctions';
import ScreenWrapper from '../component/ScreenWrapper';
import axios from 'axios';
import { getAllYearApi } from '../service/api';

const AllYearInYear = ({navigation: {navigate}}) => {
  const [allYears, setAllYears] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =await getAllYearApi();
        setAllYears(res.data.data);
      } catch (error) {
        Alert.alert('Error',error.message);
      }
    };
    fetchData();
  }, []);
  // const allYears = getAllYear();
  const start = allYears?.[0]?.formatStartDate ?? '00-00-0000';
  const end = allYears?.[allYears.length - 1]?.formatEndDate ?? '00-00-0000';
  const current = new Date();
  const currentYear = current.getFullYear();
  const {height} = Dimensions.get('window');
  const hp = height / 100;

  return (
    <ScreenWrapper>
      {/* header */}
      <View style={{marginVertical: 20}}>
        <Text variant="headlineLarge" style={{textAlign: 'center'}}>
          All Years in {currentYear}
        </Text>
        <Text
          variant="titleMedium"
          style={{textAlign: 'center'}}>{`(${start} to ${end}) 52 week`}</Text>
        <Text variant="titleSmall" style={{textAlign: 'center'}}>
          This Year scores
        </Text>
      </View>
      {/* <Text>{JSON.stringify(allYears)}</Text> */}
      {/* all month of year */}
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {allYears.map((item, index) => (
            <Pressable
              onPress={() => {
                navigate('yearlyGoal', {
                  yearId: item._id,
                  startYear: item.startDate,
                  endYear: item.endDate,
                });
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
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {item.blockNumber}
              </Text>
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
    </ScreenWrapper>
  );
};

export default AllYearInYear;
