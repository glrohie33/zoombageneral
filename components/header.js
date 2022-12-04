import React, {Fragment, useEffect, useRef, useState} from 'react';
import menu from "../public/assets/images/menu.svg";
import searchIcon from "../public/assets/images/search.svg";
import profile from "../public/assets/images/user.svg";
import {closeMenu, openMenu} from "../utils/functions";
import {connect, useSelector} from 'react-redux';
import {AccountCircle, ShoppingCart, Menu, Search, LinkOff} from '@mui/icons-material';
import {logoutUser} from "../store/reducers/auth";
import {get} from "../actions/auth";
import {TOPCATEGORIES} from "../utils/texthelper";
import TopCategories from "./topCategories";
import {useRouter} from "next/router";
import Link from "next/link";
function Header({logoutUser}) {
    const cart = useSelector(s=>s.cart.items.products)
    const auth = useSelector(store=>store.auth);
    const [categories,setCategories] = useState([]);
    const searchRef = useRef();
    const router = useRouter();

    function loginButton(){
        return auth.isLogin?
            <button onClick={()=>{logoutUser()}}  className={'btn-block btn login-btn'}> Logout</button>
            :
            <a  href={'/login'} className={'btn-block btn login-btn'}> Login </a>

    }

    function loadCategories (){
        get(TOPCATEGORIES)
            .then(resp=>{
            const {status,categories}=resp.data;
                if(status){
                    setCategories(categories);
                }
        }).catch(e=>{

        })
    }

    function searchProduct({code}){
        if(code.toLowerCase() === 'enter'){
            search();
        }
    }

    function search(){
        const value = searchRef.current.value;
        if(value){
            router.push(`/products?search=${value}`);
        }
    }

    useEffect(()=>{
            loadCategories();
    },[])
    return (
        <Fragment>
            <header>
                <section className={'row'}>
                        <div className={'menu-icon icons'}>
                           <Menu/>
                            <TopCategories categories={categories} />
                        </div>
                        <div className={'logo-cover'}>
                            <Link href="/">
                                <img src={'assets/images/zoomba.png'} alt="zoomba logo"/>
                            </Link>
                        </div>
                        <div className={'search-bar'}>
                            <input ref={searchRef} type={'text'} placeholder={'Search for Products...'} onKeyDown={searchProduct}/>
                            <span className={'search-icon icons'} onClick={search}>
                                <Search/>
                            </span>
                        </div>
                    <div className="other-menus">
                        <div className={'flex flex-center menu-cover'}>
                            <button  onClick={()=>{openMenu('login-menu')}} onBlur={()=>{
                                closeMenu('login-menu')
                            }}  className={'menu-controller flex align-center text-center cart-icon'} >
                                <span className={'icons'}>
                                    <AccountCircle/>
                                </span>
                                <span className={'text'}>My Dashboard</span>
                            </button>
                            <div className={'menu login-menu'} id={'login-menu'} aria-label={'login-menu'}>
                                <div className={'login-btn-cover'}>
                                    {
                                        loginButton()
                                    }

                                </div>

                                <Link href={'/dashboard'} className={'flex align-center'}>
                                <span className={'icons icon-md'}>

                                </span>My Dashboard</Link>
                                <Link href={'/orders'} className={'flex align-center'}>My Orders</Link>
                            </div>
                        </div>
                        <div className={'flex flex-center'}>
                            <Link href={"/cart"} className={'flex align-center text-center cart-icon'}>
                                <span className={'icons'}>
                                    <ShoppingCart/>
                                    <p className='cart-count'>{cart?.length || 0}</p>
                                </span>
                                <span className={'text'}>Cart</span>

                            </Link>
                        </div>
                    </div>

                </section>
            </header>
        </Fragment>
    );
}

export default connect(null,{logoutUser})(Header);
