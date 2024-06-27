import React from 'react';
import WeekGoalScreen from './src/screen/WeekGoalScreen';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DayReviewScreen from './src/screen/DayReviewScreen';
import AllDaysScreen from './src/screen/AllDaysScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="weeklyGoal">
        <Stack.Screen
          name="weeklyGoal"
          component={WeekGoalScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="dayReview"
          component={DayReviewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="allDays"
          component={AllDaysScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
