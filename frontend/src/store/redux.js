import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    timeLineData: {}
}

const dataSlice = createSlice({
    name: 'timeLine',
    initialState,
    reducers: {
        addYearData: (state,action)=>{
            const {fetchYear,yearData} = action.payload;
            state.timeLineData[fetchYear] = yearData;
        },
        getYearData: (state,action)=>{
            const {fetchYear} = action.payload;
            const yearData = state.allData[fetchYear];
            return yearData?yearData:[];
        }
    }
})

export const {addYearData,getYearData} = dataSlice.actions;
export default dataSlice.reducer