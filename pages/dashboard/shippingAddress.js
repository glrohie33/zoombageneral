import React, {useEffect, useState} from 'react';
import {post} from "../../actions/auth";
import {AUTHALERTNAME, SETDEFAULTSHIPPING, SUCCESSALERT, WARNINGALERT} from "../../utils/texthelper";
import {addAlert} from "../../store/reducers/alertSlice";
import {useDispatch} from "react-redux";
import DashboardLayout from "../../layout/dashboardLayout";

function ShippingAddress(props) {
    const dispatch = useDispatch();

    const {data:{userData=[]}} = props;
    const {metaData=[],defaultAddress} = userData;
    const [defaultShippingAddress,setDefaultAddress] = useState('');
    useEffect(()=>{
        setDefaultAddress(defaultAddress);
    },[defaultAddress])
    const setAsDefault = (shippingId)=>{
            post(SETDEFAULTSHIPPING, {shippingId}).then(res =>{
                const {status} = res.data;
                if (status){
                    dispatch(addAlert({
                        name:AUTHALERTNAME,
                        message:'Default address has been set',
                        status:SUCCESSALERT
                    }));
                    setDefaultAddress(shippingId);
                }
            }).catch(e=>
            {
                const respData = e.response.data;
                dispatch(addAlert({
                    name:AUTHALERTNAME,
                    message: respData.message,
                    status:WARNINGALERT
                }))
            })
    }
    const isDefaultShipping = (id)=>{
        return (id === defaultShippingAddress)?
            <p>Default Shipping address</p>
            :
            <button className={'btn btn-sm'} onClick={()=>setAsDefault(id)} >Set As Default</button>
        ;
    }
    return (
        <div className={'flex flex-wrap'}>
            {
                metaData.map(item=>(
                    <div className={'col_6'}>
                        <div className="address-card">
                            <div className={'card'}>
                                <div className="content flex flex-wrap ">
                                    <div className="col_12"><p><span>Name:</span> {item.data.firstName} {item.data.lastName}</p></div>
                                    <div className="col_12"><p><span>phone1:</span> {item.data.phoneNumber}</p></div>
                                    {item.data.additionalPhoneNumber &&
                                        <div className="col_12"><p><span>phone2:</span> {item.data.additionalPhoneNumber}</p></div>
                                    }
                                    <div className="col_12"><p><span>address:</span> {item.data.address}</p></div>
                                    <div className="col_4"><p>{item.data.state}</p></div>
                                    <div className="col_4"><p>{item.data.city}</p></div>
                                    <div className="col_4"><p>{item.data.town}</p></div>
                                </div>
                                <div className="footer">
                                    {
                                        isDefaultShipping(item.id)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                )

                )
            }
        </div>
    );
}

ShippingAddress.getLayout = function getLayout(page){
    return(<DashboardLayout page={'shippingAddress'}>
        {page}
    </DashboardLayout>)
}

export default ShippingAddress;
