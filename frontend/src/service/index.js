import axios from "axios";
import { useSelector } from "react-redux";

const createApiInstance = () =>{
    const baseURL = useSelector(state =>state?.timeData?.timeLineData?.['url'])?? 'http://192.168.1.4:5000/api/v1';
    return axios.create({
        baseURL
    })
}
export {createApiInstance};