import axios from "axios";
import { useSelector } from "react-redux";

const createApiInstance = () =>{
    const baseURL = useSelector(state =>state?.timeData?.timeLineData?.['url'])?? 'http://192.168.1.4:5000/api/v1';
    const token = useSelector(state => state?.timeData?.timeLineData?.['token'])?? undefined;
    const api = axios.create({
        // baseURL: "https://full-cuddly-moray.ngrok-free.app/api/v1"
        baseURL
    })
    if(token){
        api.defaults.headers.common['Authorization']=`Bearer ${token}`;
        console.log('token added');
    }
return api;
}
export {createApiInstance};