import React, {useRef} from 'react';
import {Edit} from "@mui/icons-material";
import {AUTHALERTNAME, BASEURL} from "../../utils/texthelper";
import {useDispatch} from "react-redux";
import {addAlert} from "../../store/reducers/alertSlice";

function Profile(props) {
    const {data:{user={}}} = props;
    const dispatch = useDispatch();
    const refLink = useRef();
    function copylink(){
        const input = refLink.current;
        input.select();
        input.setSelectionRange(0,9999999);
        window.navigator.clipboard.writeText(input.value);
        dispatch(addAlert({name:AUTHALERTNAME,message:'Referral link copied '+input.value,status:'success'}))
    }
    return (
    <div className="flex flex-grow flex-wrap">
        <div className="col_6 details">
            <div className="box">
                <div className="title ">
                    <h3>Account Details</h3>
                    <a href={'/'} className={'icon'}><Edit fontSize={'small'}/></a>
                </div>
                <div className="content">
                    <p className={'capitalize text-bold'}>{`${user.firstname} ${user.lastname}`}</p>
                    <p>{user.email}</p>
                    <p> <input readOnly={true} ref={refLink} value={`${BASEURL}/register?referee=${user.username}`} />  </p>
                    <p><button className={'btn'} onClick={copylink}>Copy link</button></p>
                </div>

            </div>
        </div>
        <div className="col_6 details">
            <div className="box">
                <div className="title">
                    <h3>Address</h3>
                    <button className={'icon'}><Edit fontSize={'small'}/></button>
                </div>
                <div className="content">
                    <span><i>This is your default shipping address</i></span>
                    <p className={'capitalize text-bold'}>{`${user.defaultAddress?.data?.firstName} ${user.defaultAddress?.data?.lastName}`}</p>
                    <p>{user.defaultAddress?.data?.address}</p>
                    <p>{user.defaultAddress?.data?.phoneNumber}</p>
                </div>
            </div>
        </div>
    </div>
);
}
Profile.getInitialProps = ()=>{
    return {}
}

export default Profile;
