import {get} from "../../actions/auth";
import {USERDATAURL, USERSORDERS, USERSPROFILE} from "../../utils/texthelper";
import {memo, useState, useEffect, useCallback} from "react";
import {useSearchParams} from "react-router-dom";
const urls = {
    profile: USERSPROFILE,
    orders: USERSORDERS,
    shippingaddress: `${USERDATAURL+'/all'}?datatype=shippingAddress`
}


function ProfilePages({page,render}) {


    return (
        <>
            {
                render(data||[],loadData)
            }
        </>
    );
}

export default memo(ProfilePages)
