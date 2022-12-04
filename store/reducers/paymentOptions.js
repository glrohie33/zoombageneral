import {createSlice} from "@reduxjs/toolkit";

const payment = createSlice(
    {
        name:"paymentOption",
        initialState:{
            data:[]
        },
        reducers:{
            addPaymentGateways(store,{payload}){
                store.data = payload;
            }
        }
    }
)

export  const {addPaymentGateways} = payment.actions;
export default payment.reducer;