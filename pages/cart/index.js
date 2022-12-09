import React, {useEffect, useState} from 'react';
import {get, post} from "../../actions/auth";
import {AUTHALERTNAME, CARTTYPE, CARTURL} from "../../utils/texthelper";
import {AddOutlined, Delete, RemoveOutlined} from "@mui/icons-material";
import {addAlert} from "../../store/reducers/alertSlice";
import {addItemToCart, removeItemFromCart} from "../../store/reducers/cart";
import {useDispatch, useSelector} from "react-redux";
import {toCurrency} from "../../utils/functions";
import DefaultLayout from "../../layout/defaultLayout";
import Link from "next/link";

function Cart(props) {
    const [cart,setCart] = useState([]);
    const {items:{products},basket} = useSelector(s=>s.cart);
    const dispatch = useDispatch();
    const getCartItems = ()=>{
        get(`${CARTURL}/${CARTTYPE}`).then(r=>{
            const {status,cart} = r.data;
            if(status){
                setCart(cart);
            }
        })
    }

    const addToCart = (event)=>{
        const {name,value,dataset:{id}} = event.currentTarget;
        const item = products.find(itm=>itm.productId === id);
        if(item) {
            const formData = {...item};
            formData.action = name;
            formData.quantity += Number(value);
            post(CARTURL, formData).then(r => {
                const {message} = r.data;
                getCartItems();
                dispatch(addAlert({name: AUTHALERTNAME, message, status: 'success'}))
                if (formData.quantity === 0) {
                    dispatch(removeItemFromCart(formData))
                } else {
                    dispatch(addItemToCart(formData));
                }

            }).catch(e => {
                const {message} = e.response.data;
                dispatch(addAlert({name: AUTHALERTNAME, message}))
            });
        }
    }



    useEffect(()=>{
        getCartItems();
    },[]);

    function loadCart(){
        if(cart.length > 0){
            return (
                <>
                    <div className={'col_9 side-bar'}>
                        <div className="card">
                            <div className={'title cart-top'}>Cart</div>
                            <div className="content">
                                {
                                    cart.map(
                                        item=>(
                                            <div className="cart-item-container" key={item.productId}>
                                                <div className={'item-preview'}>
                                                    <div className={'image-cover'}>
                                                        <img src={item.mainImage} alt={item.name}/>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        <div className="product-details">
                                                            <h3>{item.productName}</h3>
                                                            <p>Brand: <span>{item.brand}</span></p>
                                                        </div>
                                                        <div className={"price-details"}>
                                                            <h3>{toCurrency(item.price)}</h3>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={'item-actions '}>
                                                    <div className={'delete col_6'}>
                                                        <button onClick={(event)=>(addToCart(event))} data-id={item.productId} value={'-'+item.quantity} name={'dec'} className={'btn btn-sm'}>
                                                            <Delete fontSize={'small'}/>
                                                        </button>
                                                    </div>
                                                    <div className={'change-quantity col_6'}>
                                                        <button onClick={(event)=>(addToCart(event))} data-id={item.productId} value={-1} name={'dec'}  className={'btn btn-sm'}   ><RemoveOutlined fontSize={'small'}/></button>
                                                        <p className={'quantity-view'}>{item.quantity}</p>
                                                        <button onClick={(event)=>(addToCart(event))} data-id={item.productId} value={+1} name={'inc'}   className={'btn btn-sm'} ><AddOutlined fontSize={'small'}/></button>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div className={'col_3'}>
                        <div className="card">
                            <div className={'title'}>Summary</div>
                            <div className="content">
                                <div className={'cart-summary'}>
                                    <p>Total</p>
                                    <h3>
                                        {
                                            toCurrency(cart.reduce((a,b)=> a + b.total,0))
                                        }
                                    </h3>
                                </div>
                            </div>
                            <div className={'footer'}>
                                <Link href={'/checkout'} className={'btn btn-block'} style={{display:'inline-block'}}>Checkout</Link>
                            </div>
                        </div>
                    </div>
                </>)


        }else{
            return <p>Opps there is no item in your cart yet</p>
        }
    }

    return (
        <section className={'row cart-view'}>
            <div className={'col flex flex-wrap'}>
                {
                    loadCart()
                }

            </div>
        </section>
    );
}

Cart.getLayout  = function getLayout(page){
    return(
        <DefaultLayout>
            {page}
        </DefaultLayout>
    )
}

Cart.getInitialProps = ()=>{
    return {}
}

export default Cart;
