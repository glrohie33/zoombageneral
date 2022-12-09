import React, {useState} from 'react';
import {Close} from "@mui/icons-material";
import {Modal} from "@mui/material";
import KycForm from "./kycForm";
import {addAlert} from "../store/reducers/alertSlice";
import {AUTHALERTNAME, REQUESTURL} from "../utils/texthelper";
import {useDispatch} from "react-redux";
import {post} from "../actions/auth";

function UnitedCapital({order,finishOrder}) {
    const [modalStatus,setModalStatus] = useState(false);
    const [form,setFormData] = useState({
       accountNumber:"",
       nationalIdNumber:"",
       bvn:"",
       workEmail:"",
       workAddress:""
    });

    const dispatch = useDispatch();

    function setData({target}){
        const {name,value} = target;
        setFormData(v=>({...v,[name]:value}));
    }

    async function submitData(){
        try{
            if(Object.values(form).some(v=>!(v))){
                throw Error('all fields are required');
            }

            const {status,data:{status:requestStatus}} = await post(REQUESTURL,{
                type:'orders',
                modelId: order._id,
                data: JSON.stringify(form)
            });
            if(!status){
                throw Error('Order not successful');
            }

            finishOrder(true,true,'Request successful. Someone from united capital will reach out thanks');
            setModalStatus(false);

        }catch ({message}) {
            dispatch(addAlert({name:AUTHALERTNAME,message:message}));
        }

    }
    return (
        <>
            <Modal  open={modalStatus} onClose={()=>{setModalStatus(false)}}>
                <div className="col">
                    <div className="card modal-body">
                        <div className="modal-header title">
                            <button className={'btn btn-sm'} onClick={()=>setModalStatus(false)}><Close fontSize={'small'}/></button>
                        </div>
                        <div className="modal-content content">
                            <KycForm  form={form} setData={setData}/>
                        </div>
                        <div className="modal-footer footer">
                            <button className={'btn'} onClick={submitData}>Done</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <div>
            <button className={'btn btn-block'} onClick={()=>setModalStatus(true)}>Pay With United Capital</button>
        </div>
        </>

    );
}

export default UnitedCapital;
