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
    <Script>

    </Script>
  const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(setUserData());
     dispatch(setCartData());
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<>
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


      <Component {...pageProps} />
  </> )
}

export default wrapper.withRedux(MyApp)
