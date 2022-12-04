import React, {Fragment} from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import {AUTHALERTNAME, RAVEKEY} from "../utils/texthelper";
import { useDispatch } from 'react-redux';
import { addAlert } from '../store/reducers/alertSlice';

export default function Flutterwave({order,finishOrder}) {
    const dispatch = useDispatch();
    const {paymentRef,downPayment,user:{firstname,lastname,phoneNumber,email}} = order;
    const config = {
        public_key: RAVEKEY,
        tx_ref: paymentRef,
        amount: downPayment,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            phonenumber: phoneNumber,
            name: `${firstname} ${lastname}`,
        },
        customizations: {
            title: 'Zoomba Nigeria',
            description: 'Orders Checkout',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const fwConfig = {
        ...config,
        text: 'Pay with Flutterwave!',
        callback: (response) => {
           finishOrder({transactionId:response.transaction_id})
            closePaymentModal()
        },
        onClose: (incomplete) => {
            if(!incomplete){
                dispatch(addAlert({
                    name:AUTHALERTNAME,
                    message:'Your payment is being processed we will notify you on the outcome of your order',
                    status:'info'
                }))
                setTimeout(()=>{
                    finishOrder(null);
                },3000);
            }

        },
    };

    return (
        <Fragment>
            <FlutterWaveButton className={'btn btn-block'} {...fwConfig} />
        </Fragment>
    );
}
