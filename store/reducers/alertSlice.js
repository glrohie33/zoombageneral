import {createSlice} from "@reduxjs/toolkit";
import {AUTHALERTNAME} from "../../utils/texthelper";
import {generateId} from "../../utils/functions";
export const alertSlice = createSlice({
    name:'alert',
    initialState:{
        [AUTHALERTNAME]:[],
    },
    reducers:{
        addAlert(state,action){
            const {name,message,status='error'} = action.payload;
            if(typeof message == "object"){
                message.forEach(err=>{
                    const id = generateId();
                    state[name].push({message:err,status,id});
                    setTimeout(()=>{
                        removeAlert(state,{payload:{name,id}});
                    },5000);
                })
            }else{
                const id = generateId();
                state[name].push({message,status,id});
                setTimeout(()=>{
                    removeAlert(state,{payload:{name,id}});
                },5000);
            }

        },
        removeAlert(state,action){
            const {name,id} = action.payload;
            state[name] = state[name].filter(err=>err.id !== id);
        },
        clearAlert(state,action){
            state[action.payload] = [];
        }
    }
});

export const {addAlert,removeAlert,clearAlert} = alertSlice.actions;
export default  alertSlice.reducer;
