import {configureStore} from '@reduxjs/toolkit'
import dataSliceReducer from './redux'
const store = configureStore({
   reducer: {
      timeData: dataSliceReducer
   }
});

export default store;
