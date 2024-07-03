import React from 'react';
import WeekGoalScreen from './src/screen/WeekGoalScreen';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DayReviewScreen from './src/screen/DayScreen';
import AllDaysScreen from './src/screen/AllDaysScreen';
import AllMonthsScreen from './src/screen/AllMonthsScreen';
import YearGoalScreen from './src/screen/YearGoalScreen';
import AllYearInYear from './src/screen/AllYearInYear';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="allYear">
        <Stack.Screen
          name="allYear"
          component={AllYearInYear}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="yearlyGoal"
          component={YearGoalScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="allMonths"
          component={AllMonthsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="weeklyGoal"
          component={WeekGoalScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="allDays"
          component={AllDaysScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="dayReview"
          component={DayReviewScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
