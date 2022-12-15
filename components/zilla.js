import React, {useRef} from 'react';
import Connect from "@usezilla/zilla-connect"
import {ZILLAKEY} from "../utils/texthelper";

function Zilla({order,finishOrder}) {
    const {paymentRef,downPayment,user:{firstname,lastname,phoneNumber,email}} = order;

    const zillaConfig = useRef({
        publicKey: ZILLAKEY,
        onSuccess: (data) => {
            finishOrder(true);
        },
        onError:(data)=>{
          console.log(data)
        },
        clientOrderReference: paymentRef,
        title: "Zoomba pay with zilla checkout",
        amount: downPayment,
    });
    const zillaConnect = useRef(new Connect());
    function openZilla(){
        try{
            zillaConnect.current.openNew(zillaConfig.current);
        }catch (e) {
            console.log(e.message)
        }

    }
    return (
        <>
        <div>
            <button className={'btn btn-block'} onClick={openZilla}>Pay With Zilla</button>
        </div>
        </>
    );
}

export default Zilla;
