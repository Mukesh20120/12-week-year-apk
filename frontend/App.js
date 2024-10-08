import React from 'react';
import MonthGoalScreen from './src/screen/MonthGoalScreen';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AllDaysScreen from './src/screen/AllDaysScreen';
import AllMonthsScreen from './src/screen/AllMonthsScreen';
import YearGoalScreen from './src/screen/YearGoalScreen';
import AllYearInYear from './src/screen/AllYearInYear';
import DayGoalScreen from './src/screen/DayGoalScreen';
import { Provider } from 'react-redux';
import store from './src/store/store';
import AddUrlScreen from './src/screen/AddUrlScreen';
import SignIn from './src/screen/SignIn';
import Register from './src/screen/Register';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="addUrl">
        <Stack.Screen
          name="login"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="addUrl"
          component={AddUrlScreen}
          options={{headerShown: false}}
        />
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
          component={MonthGoalScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="allDays"
          component={AllDaysScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="dayReview"
          component={DayGoalScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
