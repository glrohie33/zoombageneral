import '../styles/maincss.css'
import '../styles/main.scss'
import '../styles/header.css'
import '../styles/footer.scss'
import '../styles/topcategories.scss'
import '../styles/dashboard.scss'
import {wrapper} from "../store/store";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUserData} from "../store/reducers/auth";
import {setCartData} from "../store/reducers/cart";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(setUserData());
     dispatch(setCartData());
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

    return getLayout(<Component {...pageProps} >
    </Component>)
}

export default wrapper.withRedux(MyApp)
