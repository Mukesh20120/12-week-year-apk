import api from "./index";

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