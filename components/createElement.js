import {createElement} from 'react';
import ProductBox from "./productBox";
import ImageBox from "./imageBox";
import ProductView from "./productView";
import Flutterwave from "./flutterwave";
import ProductList from "./productList";
import UnitedCapital from "./unitedCapital";
import CarbonZero from "./carbonZero";
import Zilla from "./zilla";

const elements ={
    'productBox':ProductBox,
    'imageBox':ImageBox,
    'productView': ProductView,
    'rave':Flutterwave,
    'productList':ProductList,
    'ucap':UnitedCapital,
    'carbon':CarbonZero,
    'zilla':Zilla
}

export const CreateElement=(element,props)=>{
    console.log(element)
    if(element in elements){
        return createElement(elements[element],{...props})
    }
}
