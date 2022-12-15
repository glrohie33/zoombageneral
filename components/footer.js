import React from 'react';
import logo from "../public/assets/images/zoomba.png";
import Link from "next/link";
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
                                <li><Link href="/about-us">About us</Link></li>
                                <li><Link href="/terms">Terms & Conditon</Link></li>
                                <li><Link href="/privacy">Privacy & Policy</Link></li>
                            </ul>
                        </div>
                        <div className="col_4">
                            <h3 className={'col-headers'}>Quick Links</h3>
                            <ul>
                                <li><Link href="/about-kampe-page">About Zoomba</Link></li>
                                <li><Link href="/contact-us">Contact Us</Link></li>
                                <li><Link href="/cart">View Cart</Link></li>
                            </ul>
                        </div>
                        <div className="col_4">
                            <div className="footer-logo">
                                <img src={'/assets/images/zoomba.png'} alt="zoomba logo"/>
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
