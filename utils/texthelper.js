import logo from '../public/assets/images/zoomba.png';
import {getZoombaEndpoint} from "./functions";
export const SUCCESSALERT = 'success';
export const INFOALERT = 'info';
export const ERRORALERT = 'error';
export const WARNINGALERT = 'warning';

const ZOOMBABASEURL =  getZoombaEndpoint();
export const REGISTRATIONENDPOINT = `${ZOOMBABASEURL}/users`;
export const LOGINENDPOINT = `${ZOOMBABASEURL}/auth/login`;
export const AUTHALERTNAME = 'authAlert';
export const STORAGEUSERKEY = 'ZoombaUser';
export const CATEGORYLISTURL = `${ZOOMBABASEURL}/categories`;
export const PLATFORMlISTURL = `${ZOOMBABASEURL}/platform`;
export const ATTRIBUTElISTURL = `${ZOOMBABASEURL}/attributes`;
export const GETUSERURL = `${ZOOMBABASEURL}/users/`;
export const DEFAULTIMAGE = "https://via.placeholder.com/150?text=select+image";
export const BRANDLISTURL = `${ZOOMBABASEURL}/brands`;
export const STORELISTURL = `${ZOOMBABASEURL}/stores`;
export const VERIFYSTOREURL = `${ZOOMBABASEURL}/stores/verify`;
export const MEDIAURL = `${ZOOMBABASEURL}/media`;
export const PRODUCTURL = `${ZOOMBABASEURL}/products`;
export const POSTURL = `${ZOOMBABASEURL}/posts`;
export const REQUESTURL = `${ZOOMBABASEURL}/requests`;
export const PAGEURL = `${ZOOMBABASEURL}/page`;
export const CARTTYPE = 'zoombaCart';
export const CARTURL = `${ZOOMBABASEURL}/cart`;
export const USERDATAURL = `${ZOOMBABASEURL}/users/metadata`;
export const SHIPPINGURL = `${ZOOMBABASEURL}/shipping`;
export const PLATFORMID = '62d5579dca3b13dd503da897';
export const ORDERURL = `${ZOOMBABASEURL}/orders`;
export const RAVEKEY = process.env.REACT_APP_RAVE_KEY;
export const PAYMENTOPTIONSURL = `${ZOOMBABASEURL}/payment-options`;
export const USERSPROFILE = `${ZOOMBABASEURL}/users/profile`;
export const USERSORDERS = `${ZOOMBABASEURL}/users/orders`;
export const SETDEFAULTSHIPPING = `${ZOOMBABASEURL}/users/setDefaultShipping`;
export const TOPCATEGORIES = `${ZOOMBABASEURL}/categories/topcategories`;
export const ZOOMBAFRONTENDBASEURL = process.env.REACT_APP_ZOOMBA_LINK;
export const COOKIE_EXPIRE =  2 * 24 * 60 * 60 * 1000;
export const BASKETNAME = 'zoombaKampeBasket';
export const BASEURL = process.env.REACT_APP_BASE_URL ;
export const DEFAULTHEADERS = {
    title:"1st pay small small online shopping platform in Nigeria || Zoomba Kampe",
    description:"Buy and pay small-small on Zoomba Nigeria. An eCommerce marketplace dedicated to providing conveniently payment plan AKA LAYAWAY transactional model in Africa.",
    keywords:"pay small small,shopping platform in nigeria,online shop,buy and pay later,buy phone and pay small small,buy laptop online and pay small small",
    image:logo
};
export const FINANCEORDERURL = 'orders/financeorder';
