import React, {useState, useEffect} from 'react';
import {Dimensions, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {getDateInDDMMYY} from '../utils/generateFunctions';
import {getAllDayApi} from '../service/api';
import { addIdData } from '../store/redux';
import { useDispatch, useSelector } from 'react-redux';

const AllDaysScreen = ({route, navigation: {navigate}}) => {
  const {startMonth, endMonth, monthId, yearId} = route.params;
  const [dayList, setDayList] = useState([]);
  const dayOfWeek = 2;

  const searchKey = startMonth + '#' + monthId + '#' + endMonth + '#' + yearId;
  const fetchDayData =
    useSelector(state => state?.timeData?.timeLineData?.[searchKey]) ?? [];
  const dispatch = useDispatch();

  const start = getDateInDDMMYY(new Date(startMonth));
  const end = getDateInDDMMYY(new Date(endMonth));

  useEffect(() => {
    const fetchAllDayData = async () => {
      try {
        if (fetchDayData && fetchDayData.length > 0) {
          setDayList(fetchDayData);
        } else {
          const queryData = {
            startDate: startMonth,
            endDate: endMonth,
            monthId,
            yearId,
          };
          const res = await getAllDayApi({queryData});
          setDayList(res.data.data);
          dispatch(addIdData({id: searchKey, data: res.data.data}));
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    fetchAllDayData();
  }, []);

  const {height, width} = Dimensions.get('window');
  const hp = height / 100;
  const wp = width / 100;

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
        {/* <Text>{JSON.stringify(dayList)}</Text> */}
        {dayList &&
          dayList.map((item, index) => (
            <Pressable
              onPress={() => {
                navigate('dayReview', {
                  dayId: item._id,
                  monthId,
                  yearId,
                  date: item.date,
                  day: item.day,
                });
              }}
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
              <Text style={{fontWeight: 'bold'}}>{item.formatDate}</Text>
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
