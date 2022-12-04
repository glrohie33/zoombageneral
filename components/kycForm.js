import React from 'react';

function KycForm({form,setData}) {
    return (
        <div className={'col flex shipping-address-form'}>
            <div className={'col_6'}>
                <div className={'content'}>
                    <input name={'accountNumber'} value={form.firstName} className={'form-control'} placeholder={'Account Number'} onChange={setData}/>
                    <input name={'nationalIdNumber'}  value={form.lastName} className={'form-control'}  placeholder={'National Id Number'} onChange={setData}/>
                    <input name={'bvn'} value={form.phoneNumber} className={'form-control'} placeholder={'BVN'} onChange={setData}/>
                    <input name={'workEmail'} value={form.additionalPhoneNumber} className={'form-control'} placeholder={'Work Email'} onChange={setData}/>
                    <textarea rows={4} value={form.address} name={'workAddress'} className={'form-control'} placeholder={'Address'} onChange={setData}>
                        </textarea>

                </div>
            </div>
        </div>
    );
}

export default KycForm;
