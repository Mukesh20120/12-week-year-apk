import React from 'react';
import {View} from 'react-native';

function ScreenWrapper({children}) {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          height: '100%',
          display: 'flex',
          marginHorizontal: 10,
        }}>
        {children}
      </View>
    </View>
  );
}

export default ScreenWrapper;
