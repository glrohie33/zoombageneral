import {configureStore} from "@reduxjs/toolkit";
import Auth from "./reducers/auth";
import Cart from "./reducers/cart";
import Alert from  "./reducers/alertSlice";
import PaymentOptions from "./reducers/paymentOptions";
import {createWrapper} from "next-redux-wrapper";


const store = configureStore({
    reducer:{
        auth: Auth,
        cart:Cart,
        alert:Alert,
        paymentOptions:PaymentOptions
    }
})

const makeStore = ()=>store;

export const wrapper = createWrapper(makeStore);
export default store;
