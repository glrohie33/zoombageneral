import {v4 as uuidv4} from "uuid";
import {CARTTYPE, COOKIE_EXPIRE, ZOOMBAFRONTENDBASEURL} from "./texthelper";
import React from "react";
export const generateId = ()=>{
    return uuidv4();
}

export const buildCustomEvent = (name,value)=>{
    return {
        target:{
            name,
            value
        }
    }
}

export const getInputFiles = async (inputFiles) => {
    const keys = Object.keys(inputFiles);
    let files = keys.map((key) => {
        const file = inputFiles[key];
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                resolve({file,preview:fileReader.result});
            }
            fileReader.readAsDataURL(file);
        });
    });

    return await Promise.all(files);
}

export function convertToForm(form,formSchema=null){
    const formData = new FormData();
    buildData(form,formData,formSchema,);
    return formData;
}

function buildData(form,formData,formSchema=null ,name=""){
    const SchemaKeys = (formSchema)?Object.keys(formSchema):Object.keys(form);

    for(let key of SchemaKeys) {
        const value = form[key];
        const fieldname = name||key ;
        if(typeof value == 'object' && Array.isArray(value)) {

            buildData(value,formData,null,`${fieldname}[]`);
        }else{
            formData.append(fieldname, value);
        }
    }
}



export const openMenu=(name)=>{
    const ele = document.querySelector(`.menu[aria-label=${name}]`);
    if(ele){
        ele.classList.toggle('opened');
    }
}

export const closeMenu = (name)=>{
    const ele = document.querySelector(`.menu[aria-label=${name}]`);

    if(ele){
        setTimeout(()=>{
            ele.classList.toggle('opened')
        },200)
    }
}

export const validate = (object,validatorSchema)=>{
    const resp = {
        status:true,
        errors:[],
    };
    if(typeof validatorSchema == 'function'){
        validatorSchema(object,resp);
    }else{
        const keys = Object.keys(validatorSchema);
        keys.forEach((key)=>{
            const rules = validatorSchema[key];
            if(typeof rules === 'function'){
                rules(object[key],resp);
            }else{
                if(rules.includes('required')){
                    if( (key in object) && object[key].length === 0){
                        resp.errors.push(`${key} is required`);
                        resp.status = false;
                    }
                }
            }

        })
    }


    return resp;
}

export const toCurrency =  (value)=>{

    return '₦'+Number(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatDate = (inDate)=>{

    try {
        const date = new Date(inDate);
        const dateString = [date.getFullYear(),date.getMonth(),date.getDate()];
        return dateString.join("/");
    }catch (e) {

    }

}

export function getChildren(level=1,parent,categories){
    let levelCategories=[];
    if(level < 4){
     levelCategories =  categories.filter(category=>category.parent === parent);
     levelCategories.forEach((category,index)=>{
         levelCategories[index].children = getChildren(level+1,category.id,categories);
     })

    }

    return levelCategories;
}

export function zoomba(path){
    return ZOOMBAFRONTENDBASEURL+path;
}

export function getCart(){
    const defaultValue = {
        products:[],
        creationTime:null
    }
    let cart = JSON.parse(window.localStorage.getItem(CARTTYPE))||defaultValue;

    const now  = new Date().getTime();
    if (cart.creationTime){
        if ((cart.creationTime+COOKIE_EXPIRE) < now){
            window.localStorage.removeItem(CARTTYPE);
            cart = defaultValue;
        }


    }


    return cart;
}

export function formatToString(str){
    return str.replace(/[A-Z]/g, ' $&').trim();
}

function getHeaderDetails(){
    const defaultHeaders = {
        title:"1st pay small small online shopping platform in Nigeria || Zoomba NG",
        description:"Buy and pay small-small on Zoomba Nigeria. An eCommerce marketplace dedicated to providing conveniently payment plan AKA LAYAWAY transactional model in Africa.",
        keywords:"pay small small,shopping platform in nigeria,online shop,buy and pay later,buy phone and pay small small,buy laptop online and pay small small"
    }
}

export function getZoombaEndpoint(){
    const env = process.env.NODE_ENV;
    let url = "";
    switch (env) {
        case 'sandbox':
            url ='api.dev.zoomba.ng'
            break;
        case 'production':
            url='https:api.zoomba.ng'
            break;
        default:
            url = 'localhost:4000';
            break;
    }
    console.log(url);
    return url;

}


export function loadMeta({
                             keywords='pay small small,shopping platform in nigeria,online shop,buy and pay later,buy phone and pay small small,buy laptop online and pay small small',
                             title='1st pay small small online shopping platform in Nigeria',
                             type ='page',
                             url= ``,
                             site_name='Zoomba Nigeria',
                             image=`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/zoomba.png`,
                            description = 'Buy and pay small-small on Zoomba Nigeria. An eCommerce marketplace dedicated to providing conveniently payment plan AKA LAYAWAY transactional model in Africa.'
            }){
   return (<>
       <title>{title}</title>
        <meta name={'keywords'} content={keywords}/>
        <meta name={'title'} content={title}/>
        <meta name={'type'} content={type}/>
        <meta name={'url'} content={`${process.env.NEXT_PUBLIC_BASE_URL}${url}`}/>
        <meta name={'site_name'} content={site_name}/>
        <meta name={'image'} content={image}/>
        <meta name={'description'} content={description}/>
        <meta itemProp={'image'} content={image}/>
        <meta itemProp={'name'} content={site_name}/>
        <meta itemProp={'description'} content={description}/>
       <meta name="twitter:card" content="summary_large_image"/>
       <meta name="twitter:site" content={site_name}/>
       <meta name="twitter:title" content={title}/>
       <meta name="twitter:description" content={description}/>
       <meta name="twitter:image:src" content={image}/>
       <meta property="og:type" content={type}/>
       <meta property="og:url" content={url}/>
       <meta property="og:site_name" content={site_name}/>
       <meta property="og:description" content={description}/>
    </>);
}
