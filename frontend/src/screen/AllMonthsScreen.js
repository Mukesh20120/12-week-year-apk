import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import { addIdData } from '../store/redux';
import { useDispatch, useSelector } from 'react-redux';
import { createApiInstance } from '../service';

const AllMonthsScreen = ({route,navigation: {navigate}}) => {
  const {startMonth='2024-04-29',yearId} = route.params

  const searchKey = startMonth+"#"+yearId;
  const fetchMonthData = useSelector(state => state?.timeData?.timeLineData?.[searchKey]) ?? [];
  const dispatch = useDispatch();
 const api = createApiInstance();
  const [allMonthsData,setAllMonthsData] = useState([]);
  useEffect(()=>{
    const fetchAllMonthData = async()=>{
      try{
        if (fetchMonthData && fetchMonthData.length > 0) {
          setAllMonthsData(fetchMonthData);
        } else {
        const queryData = {
          startDate: startMonth,
          yearId
        }
       const res = await api.get('/month',{params: queryData});
       setAllMonthsData(res.data.data);
       dispatch(addIdData({id: searchKey, data: res.data.data}));
      }
      }catch(error){
        Alert.alert('Error',error.message);
      }
    }
    fetchAllMonthData();
  },[]);

  const start = allMonthsData?.[0]?.formatStartDate??new Date();
  const end = allMonthsData?.[11]?.formatEndDate ?? new Date();

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
          {allMonthsData && allMonthsData.map((item, index) => (
            <Pressable
              onPress={() => {
                navigate('weeklyGoal',{
                  monthId: item._id,
                  yearId: item.yearId,
                  startMonth: item.startDate,
                  endMonth: item.endDate,
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
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>{item.blockNumber}</Text>
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
