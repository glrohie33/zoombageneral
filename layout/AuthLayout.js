import React, {useEffect} from 'react';
import DefaultLayout from "./defaultLayout";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

function AuthLayout({children}) {
    const router = useRouter();
    const {auth:{isLogin}} = useSelector(s=>s);
    useEffect(()=>{
        if(isLogin!== null && !isLogin){
            router.push('/login');
        }
    },[isLogin])


    return (
        <div>
            <DefaultLayout>
                {children}
            </DefaultLayout>
        </div>
    );
}


export default AuthLayout;
