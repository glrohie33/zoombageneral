import React from 'react';
import {toCurrency} from "../utils/functions";

function OrderItems({items}) {
    return (
        <>
            {
                items.map(item=>(
                    <div className="box order-items" key={item._id}>
                        <div className="content">
                            <div className="flex">
                                <div className="img-container">
                                    <img src={item.mainImage} alt={item.productName}/>
                                </div>
                                <div>
                                    <h4 className={'capitalize'}>{item.productName}</h4>
                                    <span>{item.brand}</span>
                                    <p>{toCurrency(item.price)} X {item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>

    );
}

export default OrderItems;
