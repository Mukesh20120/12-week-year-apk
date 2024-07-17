import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import ScreenWrapper from '../component/ScreenWrapper';
import {getAllYearApi} from '../service/api';
import {useDispatch, useSelector} from 'react-redux';
import {addYearData} from '../store/redux';

const AllYearInYear = ({navigation: {navigate}}) => {
  const fetchYearData =
    useSelector(state => state?.timeData?.timeLineData?.['2024']) ?? [];
  const [allYears, setAllYears] = useState(fetchYearData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fetchYearData && fetchYearData.length > 0) {
          setAllYears(fetchYearData);
        } else {
          const res = await getAllYearApi();
          setAllYears(res.data.data);
          dispatch(addYearData({fetchYear: '2024', yearData: res.data.data}));
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    fetchData();
  }, []);
 
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
      <Text>{JSON.stringify(fetchYearData)}</Text>
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
