import {createSlice} from "@reduxjs/toolkit";

const auth = createSlice({
    name:'auth',
    initialState:{
        isLogin: null,
        user:{}
    },
    reducers:{
        loginUser:(state,{payload:{user}})=>{
            state.isLogin = true;
            state.user = user;
            window.localStorage.setItem('ZoombaUser',JSON.stringify(user));
        },
        logoutUser:(state)=>{
            state.isLogin = false;
            state.user = null;
            window.localStorage.removeItem('ZoombaUser');
        },
        setUserData:(state)=>{
            const storageUser = window.localStorage.getItem('ZoombaUser');
            let isLogin = Boolean(storageUser);
            let userData = (isLogin)?JSON.parse(storageUser):{};
            state.isLogin = isLogin;
            state.user = userData;
        }
    }
})

export const {loginUser,logoutUser,setUserData} = auth.actions;
export default auth.reducer;
