import React, {useEffect, useState, useMemo, useRef} from 'react';
import {get, post} from "../../actions/auth";
import {AUTHALERTNAME, CARTTYPE, CARTURL, ORDERURL, PLATFORMID,  USERDATAURL} from "../../utils/texthelper";
import { Modal, TextField} from "@mui/material";
import { Close,} from "@mui/icons-material";
import {addAlert} from "../../store/reducers/alertSlice";
import {useDispatch, useSelector} from "react-redux";
import ShippingAddress from "../../components/shippingAddress";
import {toCurrency, validate} from "../../utils/functions";
import {useRouter} from "next/router";
import DefaultLayout from "../../layout/defaultLayout";
import Page from "../[page]";
import AuthLayout from "../../layout/AuthLayout";

function Cart(props) {
    const {firstname,lastname} = useSelector(s=>s.auth.user);
    const initialData ={
        firstName:firstname,
        lastName:lastname,
        phoneNumber:"",
        additionalPhoneNumber: "",
        address: "",
        state:"",
        city:"",
    };
    const [form,setFormData] = useState({
        platformId:PLATFORMID,
        paymentGateway:'',
        shippingAddressId:'',
        cartType:CARTTYPE,
    })
    const shippingAddress = useRef('');
    const [cart,setCart] = useState([]);
    const dispatch = useDispatch();
    const [shippingData,setShippingData] = useState([]);
    const [shippingForm,setShippingFormFields] = useState(initialData);
    const [modalStatus,setModalStatus] = useState(false);
    // const [shippingPrice,setShippingPrice] = useState(0);
    const options = [4,5,6];
    const getCartItems = ()=>{
        get(`${CARTURL}/${CARTTYPE}`).then(r=>{
            const {status,cart} = r.data;
            if(status){
                setCart(cart);
            }
        })
    }

    const router = useRouter();


    // const totalWeight = useMemo(()=>{
    //       const weight = cart.reduce((a,b)=>a+b.weight,0);
    //       return weight;
    // },[cart])



    const cartSummary = useMemo(()=>{
        const cartTotal = cart.reduce((a,b)=> a + b.total,0);
        let shippingPrice = 1500;
        if (cartTotal > 50000){
            shippingPrice = 2000;
        }
        const grandTotal = (cartTotal + shippingPrice );
        return {cartTotal,grandTotal,shippingPrice};
    },[cart,form.subscriptionPeriod]);

    const component = {
        'shipping' :{
            component: <ShippingAddress form={shippingForm} setFormFields={setShippingFormFields}/>,
            action:(event)=>{
                const rules = {
                    firstName: ['required'],
                    lastName: ['required'],
                    phoneNumber: ['required'],
                    address: ['required'],
                    state: ['required'],
                    city: ['required'],
                }

                const validation=validate(shippingForm,rules);
                if(validation.status){

                    post(USERDATAURL+'/shippingAddress',{dataType:'shippingAddress',data:shippingForm}).then(res=>{
                        // const {status,metaData} = res.data;
                        setModalStatus(false);
                        setShippingFormFields(initialData)
                        getUserData();
                    }).catch(err=>{
                        if(err.response.data.message){
                            dispatch(addAlert({name:AUTHALERTNAME,message:err.response.data.message}));
                        }
                    })
                }else{
                    dispatch(addAlert({name:AUTHALERTNAME,message:validation.errors}));
                }
            }
        }
    }

    // const getDeliveryPrice = useCallback(()=>{
    //     if(form.shippingAddressId && form.shippingAddressId !== shippingAddress.current){
    //         const shippingAddress = shippingData.metaData.find(item=>item.id === form.shippingAddressId);
    //         if(shippingAddress){
    //             const data = {to:shippingAddress.data.city,weight:totalWeight,forwarding:shippingAddress.data.townCode};
    //             post(`${SHIPPINGURL}/price`,data)
    //                 .then(res=>{
    //                     const {fee} = res.data;
    //                     setShippingPrice(fee);
    //                 })
    //         }
    //     }
    // },[shippingData.metaData,shippingAddress,form.shippingAddressId,totalWeight])

    const getUserData = ()=>{
        get(`${USERDATAURL+'/all'}?datatype=shippingAddress`)
            .then(r=>{
                const {userData} = r.data;
                setShippingData(userData);
                setShippingFormFields(d=>({...d,'shippingAddressId':userData.defaultAddress}))
            })
    }


    const createOrder=()=>{
        post(ORDERURL,form).then(res=>{
            const {status,order} = res.data;
            if (status){
                dispatch(addAlert({name:AUTHALERTNAME,message:'Orders Created You will be redirected soon',status:'success'}));
                setTimeout(()=>{
                    router.push('/makePayment/'+order.id)
                },2000)
            }
        }).catch(err=>{
            if(err.response){
                const {message} = err.response.data;
                dispatch(addAlert({name:AUTHALERTNAME,message:message}));
            }
        })
    }

    const setData = (event)=>{
        const {name,value} = event.target;
        setFormData(v=>({...v,[name]:value}));
    }

    useEffect(()=>{
        getCartItems();
        getUserData();
    },[]);

    useEffect(()=>{
        // getDeliveryPrice();
        shippingAddress.current = form.shippingAddressId;
    },[form]);

    return (
        <section className={'row checkout cart-view'}>
            <div className={'col flex flex-wrap'}>
                <div className={'col_8'}>
                    <div className="card">
                        <div className={'title'}>Cart</div>
                        <div className="content">
                            {
                                cart.map(
                                    item=>(
                                        <div className="cart-item-container">
                                            <div className={'item-preview'}>
                                                <div className={'image-cover'}>
                                                    <img src={item.mainImage} alt={item.name}/>
                                                </div>
                                                <div className="flex flex-wrap flex-grow">
                                                    <div className="product-details">
                                                        <h3>{item.productName}</h3>
                                                        <p>Brand: <span>{item.brand}</span></p>
                                                    </div>
                                                    <div className={"price-details"}>
                                                        <h3>{ toCurrency(item.price)}</h3>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className="card">
                        <div className={'title'}>Shipping Address</div>
                        <div className="content">

                            {
                                shippingData?.metaData?.length === 0 &&
                                <div className={'no-shipping Address'}>
                                    <p>You Do not have any shipping address? Please add shipping Address</p>
                                </div>
                            }
                            {
                                shippingData?.metaData?.length > 0&&
                                shippingData?.metaData.map(
                                    item=>(
                                        <div className={'inner-col shipping-address'}>
                                            <input type={'radio'}  hidden value={item.id} id={item.id} name='shippingAddressId' onClick={setData} />
                                            <label className="reactive" htmlFor={item.id}>
                                                <div className="card">
                                                    <div className="content flex flex-wrap">
                                                        <div className="col_6">firstname: {item.data.firstName} </div>
                                                        <div className="col_6">lastname: {item.data.lastName}</div>
                                                        <div className="col_6">phone number: {item.data.phoneNumber}</div>
                                                        {item.data.additionalPhoneNumber &&
                                                            <div className="col_6">phone number2: {item.data.additionalPhoneNumber}</div>
                                                        }
                                                        <div className="col_12">address: {item.data.address}</div>
                                                        <div className="col_4">state: {item.data.state}</div>
                                                        <div className="col_4">city: {item.data.city}</div>
                                                        <div className="col_4">town: {item.data.town}</div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>

                                    )
                                )
                            }
                            <div className={'add-shipping-button'}>
                                <button className="btn" onClick={()=>{setModalStatus(true)}}>Add Shipping Address</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col_4 side-bar'}>
                    <div className="card">
                        <div className={'title'}>Add Coupon</div>
                        <div className="content">
                            <div className={'cart-summary'}>
                                <TextField fullWidth size={'small'} name={'coupon_code'} label={'coupon-code'}/>
                            </div>

                        </div>
                        <div className={'footer'}>
                            <button className={'btn btn-block'}>Apply Coupon</button>
                        </div>
                    </div>
                    <div className="card payment-gateway">
                        <div className={'title'}>Select Payment Gateway</div>
                        <div className="content">
                            <ul>
                                <li>
                                    <label>
                                        <input type={'radio'} name={'paymentGateway'} value={'rave'} onClick={setData}/> Rave
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <input type={'radio'} name={'paymentGateway'} value={'ucap'} onClick={setData}/> United Capital
                                    </label>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className={'title'}>Summary</div>
                        <div className="content">
                            <div >
                                <div className={'cart-summary'}>
                                    <p>Total</p>
                                    <h3>
                                        {
                                            toCurrency(cartSummary.cartTotal)
                                        }
                                    </h3>
                                </div>
                                <div className={'cart-summary'}>
                                    <p>Total</p>
                                    <h3>
                                        {
                                            toCurrency(cartSummary.shippingPrice)
                                        }
                                    </h3>
                                </div>
                                <div className={'cart-summary'}>
                                    <p>Grand Total</p>
                                    <h3>
                                        {
                                            toCurrency(cartSummary.grandTotal)
                                        }
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className={'footer'}>
                            <button className={'btn btn-block'} onClick={()=>{createOrder()}}>Make Payment</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal  open={modalStatus} onClose={()=>{setModalStatus(false)}}>
                <div className="col">
                    <div className="card modal-body">
                        <div className="modal-header title">
                            <button className={'btn btn-sm'} onClick={()=>setModalStatus(false)}><Close fontSize={'small'}/></button>
                        </div>
                        <div className="modal-content content">
                            {
                                component.shipping.component
                            }
                        </div>
                        <div className="modal-footer footer">
                            <button className={'btn'} onClick={component.shipping.action}>Done</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

Cart.getLayout  = function getLayout(page){
    return(
        <AuthLayout >
            {page}
        </AuthLayout>
    )
}

export default Cart;
