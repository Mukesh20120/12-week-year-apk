import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    timeLineData: {},
}

const dataSlice = createSlice({
    name: 'timeLine',
    initialState,
    reducers: {
        addIdData: (state,action)=>{
            const {id,data} = action.payload;
            state.timeLineData[id] = data;
        },
        addLocalUrl: (state,action)=>{
            const {url} = action.payload;
            state.timeLineData['url'] = url;
        }
    }
})

export const {addIdData,addLocalUrl} = dataSlice.actions;
export default dataSlice.reducer