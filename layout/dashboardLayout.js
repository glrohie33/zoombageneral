import React, {useCallback, useEffect, useState} from 'react';
import AuthLayout from "./AuthLayout";
import DefaultLayout from "./defaultLayout";
import {AccountBoxOutlined, InventoryOutlined, LocalShippingOutlined, PasswordOutlined} from "@mui/icons-material";
import Link from "next/link";
import {get} from "../actions/auth";
import {FINANCEORDERURL, USERDATAURL, USERSORDERS, USERSPROFILE} from "../utils/texthelper";
import {useSelector} from "react-redux";
const urls = {
    profile: {
        url:USERSPROFILE,
        query:""
    },
    orders: {
        url:USERSORDERS,
        query:""
    },
    shippingAddress:{
        url:`${USERDATAURL+'/all'}`,
        query:"datatype=shippingAddress"
    } ,
    orderRequests: {
        url:`${USERSORDERS}`,
        query: 'paymentStatus=incomplete'
    }
}
function DashboardLayout({children,page='profile'}) {
    console.log("this is the layout");
    const [data,setData] = useState({data:{},loadData:null});
    const loadData = useCallback((currentPage=1)=>{
        const{url,query=''} = urls[page]
        get(`${url}?${query}&currentPage=${currentPage}&perPage=10`).then(({status,data})=>{
            if(status){
                setData(data);
            }
        }).catch(e=>{
            console.log(e)
        })
    },[page]);
    const {auth:{user}} = useSelector(store=>store);
    useEffect(()=>{
        console.log('fetching')
        const search = 1;
        loadData(search);
    },[page,loadData])


    function childrenWithProps(){
        console.log({data});
        const newChild = React.cloneElement(children,{data,loadData});
        return <>{newChild}</>
    }
    return (
        <AuthLayout>
                <section className={'row dashboard'}>
                    <div className="col flex flex-wrap">
                        <div className="col_4 side-bar">
                            <div className="card">
                                <div className="content">
                                    <ul className={'side-menu'}>
                                        <li>
                                            <Link href={'/dashboard/'}>
                                                <AccountBoxOutlined/>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={'/dashboard/orders'}> <InventoryOutlined/> Orders</Link>
                                        </li>
                                        <li>
                                            <Link href={'/dashboard/shippingAddress'}><LocalShippingOutlined/> Shipping Address</Link>
                                        </li>
                                        <li>
                                            <Link href={'/dashboard/changePassword'}><PasswordOutlined/> Change Password</Link>
                                        </li>
                                        {
                                            (user?.role === 'finance-manager') &&
                                            <li>
                                                <Link href={'/dashboard/orderRequest'}><PasswordOutlined/> Order Request</Link>
                                            </li>
                                        }
                                    </ul>
                                    <div className={'logout'}>
                                        <button className={'btn-block btn login-btn'}>Logout</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col_8 content-area">
                            <div className={'col'}>
                                <div className="card">
                                    <div className={'title'}>
                                        <h3>{page}</h3>
                                    </div>
                                    <div className="content">
                                        {
                                            childrenWithProps()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </AuthLayout>
    );
}

export default DashboardLayout;
