import api from "./index";
//year api
export const getAllYearApi = () =>{
    return api.get('/year');
}
export const getYearGoalApi = ({yearId}) =>{
    return api.get(`/year/goal?yearId=${yearId}`);
}
export const updateYearGoalApi = ({updateData}) => {
    return api.put('/year/goal',updateData);
}
export const createYearGoalApi = ({newData}) => {
    return api.post('/year/goal',newData);
}
export const deleteYearGoalApi = ({goalId}) => {
    return api.delete(`/year/goal?goalId=${goalId}`);
}
//month api
export const getAllMonthApi = ({queryData}) =>{
    return api.get('/month',{params: queryData});
}
export const getMonthGoalApi = ({queryData}) =>{
    return api.get(`/month/goal`,{params: queryData});
}
export const updateMonthGoalApi = ({updateData}) => {
    return api.put('/month/goal',updateData);
}
export const createMonthGoalApi = ({newData}) => {
    return api.post('/month/goal',newData);
}
export const deleteMonthGoalApi = ({goalId}) => {
    return api.delete(`/month/goal?goalId=${goalId}`);
}