import {createElement} from 'react';
import ProductBox from "./productBox";
import ImageBox from "./imageBox";
import ProductView from "./productView";
import Flutterwave from "./flutterwave";
import ProductList from "./productList";
import UnitedCapital from "./unitedCapital";

const elements ={
    'productBox':ProductBox,
    'imageBox':ImageBox,
    'productView': ProductView,
    'rave':Flutterwave,
    'productList':ProductList,
    'up':UnitedCapital
}

export const CreateElement=(element,props)=>{
    console.log(element)
    if(element in elements){
        return createElement(elements[element],{...props})
    }
}
