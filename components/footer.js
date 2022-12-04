import React from 'react';
import logo from "../public/assets/images/zoomba.png";
function Footer(props) {
    return (
        <>
            <footer>
            <section className={'row'}>
                <div className="col">
                    <div className="flex flex-wrap">
                        <div className="col_4">
                            <h3 className={'col-headers'}>About Us</h3>
                            <ul>
                                <li><a href="/about-us">About us</a></li>
                                <li><a href="/terms">Terms & Conditon</a></li>
                                <li><a href="/privacy">Privacy & Policy</a></li>
                            </ul>
                        </div>
                        <div className="col_4">
                            <h3 className={'col-headers'}>Quick Links</h3>
                            <ul>
                                <li><a href="/about-kampe-page">About Zoomba</a></li>
                                <li><a href="/contact-us">Contact Us</a></li>
                                <li><a href="/cart">View Cart</a></li>
                            </ul>
                        </div>
                        <div className="col_4">
                            <div className="footer-logo">
                                <img src={logo} alt="zoomba logo"/>
                            </div>
                            <p>
                                Buy and pay small-small on Zoomba Nigeria. An eCommerce marketplace dedicated to providing conveniently payment plan AKA LAYAWAY transactional model in Africa.
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </footer>
            <section className={'footer-bottom'}>
                <div className="col">
                    <p>2022@All Rights Reserved@Zoomba.ng</p>
                </div>
            </section>
        </>

    );
}

export default Footer;
