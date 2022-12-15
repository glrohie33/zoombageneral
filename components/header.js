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
import Script from "next/script";
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
            <Script id={'google-analytic'} strategy={"afterInteractive"}>
                {`
          (function(i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
          a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

          ga('create', "UA-117985671-1", 'auto');
          ga('send', 'pageview');
          `}
            </Script>
            <Script id={"tawkto"} strategy={"afterInteractive"}>
                {
                    `
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                    (function(){
                    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                    s1.async=true;
                    s1.src='https://embed.tawk.to/5e510a4a298c395d1ce93da9/default';
                    s1.charset='UTF-8';
                    s1.setAttribute('crossorigin','*');
                    s0.parentNode.insertBefore(s1,s0);
                    })();
                    `
                }
            </Script>
            <Script id={"whatsapp"} strategy={"afterInteractive"} src={"https://s.widgetwhats.com/wwwa.js"} data-wwwa="15630"/>

            <header>
                <section className={'row'}>
                        <div className={'menu-icon icons'}>
                           <Menu/>
                            <TopCategories categories={categories} />
                        </div>
                        <div className={'logo-cover'}>
                            <Link href="/">
                                <img src={'/assets/images/zoomba.png'} alt="zoomba logo"/>
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
