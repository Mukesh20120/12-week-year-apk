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
        },
        addToken: (state,action)=>{
            const {token} = action.payload;
            state.timeLineData['token'] = token;
        }
    }
})

export const {addIdData,addLocalUrl,addToken} = dataSlice.actions;
export default dataSlice.reducer