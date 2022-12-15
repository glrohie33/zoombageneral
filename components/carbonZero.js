import React, {useEffect, useState} from 'react';

function CarbonZero({order,finishOrder}) {
    const [displayCarbonZero,setDisplayStatus] = useState(false);
    const {paymentRef,downPayment,orderItems,} = order;
    useEffect(() => {
        if (displayCarbonZero) {
            const zero = document.querySelector('.carbon-zero')
            zero?.addEventListener('close-carbon-zero', () => {
                setDisplayStatus(false)
            })
        }
    }, [displayCarbonZero])
    return (
        <>
            {
                displayCarbonZero &&
                <carbon-zero
                    className="carbon-zero"
                    merchant-id={process.env.NEXT_PUBLIC_CARBON_ZERO_MERCHANT_ID}
                    api-key={process.env.NEXT_PUBLIC_CARBON_ZERO_API_KEY}
                    country="NG"
                    total-price={downPayment}
                    purchase-ref-id={paymentRef}
                    purchase-items={orderItems}
                />
            }

            <button className={'btn btn-block'} onClick={()=>setDisplayStatus(true)}>Pay With Carbon Zero</button>
        </>
    );
}

export default CarbonZero;
