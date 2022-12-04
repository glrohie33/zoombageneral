import React from 'react';
import {useSelector} from "react-redux";
import {useLocation,Navigate} from "react-router-dom";

function Authenticate({children}) {
    const auth = useSelector(store=>store.auth);
    const location = useLocation();
    console.log(auth.isLogin);
    return auth.isLogin?(
        children
    ): <Navigate to="/login" replace={true} state={{path:location.pathname}}></Navigate>;
}

export default Authenticate;