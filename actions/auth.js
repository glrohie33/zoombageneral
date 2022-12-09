import axios from "axios";
import {PAYMENTOPTIONSURL, REGISTRATIONENDPOINT, STORAGEUSERKEY} from "../utils/texthelper";
import store from "../store/store";
import {logoutUser} from "../store/reducers/auth";
import {addPaymentGateways} from "../store/reducers/paymentOptions";
export const registerUser=async (data) => {
    return axios.post(REGISTRATIONENDPOINT, data);
}

let api = axios.create({
    baseURL: "",
    withCredentials:true,
    headers:{
        'platform':'zoomba'
    }
});

const handleGlobalError =(response,error)=>{
    // window.location = '/login';
    if(response.response.status === 401){
        store.dispatch(logoutUser());
        window.localStorage.removeItem(STORAGEUSERKEY);
    }

    return Promise.reject(response);
}

api.interceptors.response.use(resp=>{
    return resp;
},handleGlobalError);

export const post= (url,data,headers={})=>{
    return api.post(url,data,headers);
}

export const patch = (url,data,headers={})=>{
    return api.patch(url,data,headers);
}

export const get= (url,data={},headers={})=>{

    return api.get(url,{
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'platform':'zoomba'
        }
    });
}

export const loadPaymentOptions = ()=>{
    return (dispatch)=>{
        get(PAYMENTOPTIONSURL)
            .then(resp=>{
                const {status,payments} = resp.data;
                if(status){
                    dispatch(addPaymentGateways(payments))
                }
            }).catch(e=>{
                console.log(e)
        })
    }
}
