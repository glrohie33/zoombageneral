import {createSlice} from "@reduxjs/toolkit";
import { CARTTYPE} from "../../utils/texthelper";
import {getCart} from "../../utils/functions";


const cart = createSlice({
    name:"cart",
    initialState:{
        items:[],
        coupons:[],
        total:0.00,
    },
    reducers:{
        addItemToCart:(state,{payload})=>{
            const index = state.items.products.findIndex(item=>item.productId === payload.productId);
            state.items.creationTime = new Date().getTime();

            if(index > -1){
                    state.items.products[index] = payload;
                }else{
                    state.items.products.push(payload);
                }
                window.localStorage.setItem(CARTTYPE,JSON.stringify(state.items));
        },
        removeItemFromCart: (state,{payload})=>{
            const newItems = state.items.products.filter(i=>i.productId !== payload.productId);
            state.items.products = newItems;
            window.localStorage.setItem(CARTTYPE,JSON.stringify(state.items));
        },
        calculateTotal: (state)=>{
            const newTotal = state.items.reduce((a,b)=>a+b.amount,0);
            const coupons = state.coupons.reduce((a,b)=>a+b.amount,0);
            state.total = newTotal - coupons;
        },
        addCoupon:(state,{payload:{coupon}})=>{
            state.coupons = coupon;
            this.calculateTotal(state);
        },
        clearCart:(state)=>{
            state.items = {
                products:[],
                creationTime:null
            };
            state.coupons=[];
            state.total = 0.00;
            window.localStorage.removeItem(CARTTYPE);
        },
        setCartData(state){
            state.items = getCart()
        }
    }
})

export const {addItemToCart,removeItemFromCart,addCoupon,clearCart,setCartData} = cart.actions;

export default cart.reducer;
