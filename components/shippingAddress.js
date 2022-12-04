import React, {useEffect, useState} from 'react';
import {get} from "../actions/auth";
import { SHIPPINGURL,} from "../utils/texthelper";


function ShippingAddress({form,setFormFields}) {


    const [states,setStates] = useState([]);
    const [cities,setCities] = useState([]);
    const [towns,setTowns] = useState([])
    const setData = ({target})=>{
        const {name,value} =  target;
        setFormFields(v=>({...v,[name]:value}));
    }

    const selectState = (event)=>{
        const {name,value} = event.target;
            setCities([]);
            const resetvalues={
                city:'',
                cityCode:'',
                town:'',
                townCode:''
            }
            setFormFields(v=>({...v,[name]:value,...resetvalues}))
            getCities(value);
    }

    const selectCity=(event)=>{
        const {name,value,selectedIndex,options} = event.target;
        const {code} = options[selectedIndex].dataset;
        const resetvalues={
            town:'',
            townCode:''
        }
        setTowns([]);
        setFormFields(v=>({...v,[name]:value,cityCode:code,...resetvalues}))
        getTowns(code);
    }

    const selectTown =(event)=>{
        const {name,value,options,selectedIndex} = event.target;
        const {code} = options[selectedIndex].dataset;
        setFormFields(v=>({...v,[name]:value,'townCode':code}));
    }

    const getStates = ()=>{
            get(SHIPPINGURL+'/states').then(res=>{
                const {shippingData} = res.data;
                setStates(shippingData)
            })
    }

    const getCities = (state)=>{
        get(SHIPPINGURL+'/city/'+state).then(res=>{
            const {shippingData} = res.data;
            setCities(shippingData)
        })
    }

    const getTowns = (city)=>{
        get(SHIPPINGURL+'/town/'+city).then(res=>{
            const {shippingData} = res.data;
            setTowns(shippingData)
        })
    }


    useEffect(()=>{
        getStates();
    },[]);

    return (
        <div className={'col flex shipping-address-form'}>
            <div className={'col_6'}>
                    <div className={'content'}>
                        <input name={'firstName'} value={form.firstName} className={'form-control'} placeholder={'firstname'} onChange={setData}/>
                        <input name={'lastName'}  value={form.lastName} className={'form-control'}  placeholder={'lastname'} onChange={setData}/>
                        <input name={'phoneNumber'} value={form.phoneNumber} className={'form-control'} placeholder={'phone number'} onChange={setData}/>
                        <input name={'additionalPhoneNumber'} value={form.additionalPhoneNumber} className={'form-control'} placeholder={'additional phone number'} onChange={setData}/>
                        <textarea rows={4} value={form.address} name={'address'} className={'form-control'} placeholder={'address'} onChange={setData}>
                        </textarea>
                        <select name={'state'} value={form.state} className={'form-control'} onChange={selectState} >
                            <option>Select State</option>
                            {
                                states.map((state,index)=>{
                                    return <option value={state.StateName} key={index}>{state.StateName}</option>
                                })
                            }
                        </select>
                        <select name={'city'} value={form.city} className={'form-control'} onChange={selectCity} >
                            <option>Select City</option>
                            {
                                cities.map((city,index)=>{
                                    return <option value={city.CityName}  key={index} data-code={city.CityCode} >{city.CityName}</option>
                                })
                            }
                        </select>
                        <select name={'town'} value={form.town} className={'form-control'} onChange={selectTown} >
                            <option>Select Town</option>
                            {
                                towns.map((town,index)=>{
                                    return <option value={town.TownName} data-code={town.TownID} key={index}>{town.TownName}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>

    );
}

export default ShippingAddress;