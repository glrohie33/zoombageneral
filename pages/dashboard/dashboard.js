import React, {useMemo} from 'react';
import { NavLink, Outlet, useLocation} from "react-router-dom";
import '../../public/assets/css/dashboard.scss';
import {AccountBoxOutlined,
    InventoryOutlined, LocalShippingOutlined, PasswordOutlined
} from "@mui/icons-material";
import ProfilePages from "./profilePages";
function Dashboard(props) {
    const location = useLocation();

    const page = useMemo(()=>{
        return  location.pathname.split("/")[2]||'Profile'
    },[location])
    return (
        <section className={'row dashboard'}>
            <div className="col flex flex-wrap">
                    <div className="col_4 side-bar">
                        <div className="card">
                            <div className="content">
                                <ul className={'side-menu'}>
                                    <li>
                                        <NavLink to={''}>
                                            <AccountBoxOutlined/>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'orders'}> <InventoryOutlined/> Orders</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'shippingAddress'}><LocalShippingOutlined/> Shipping Address</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'changePassword'}><PasswordOutlined/> Change Password</NavLink>
                                    </li>
                                </ul>
                                <div className={'logout'}>
                                    <button className={'btn-block btn login-btn'}>Logout</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col_8 content-area">
                        <div className={'col'}>
                            <div className="card">
                                <div className={'title'}>
                                    <h3>{page}</h3>
                                </div>
                                <div className="content">
                                    <ProfilePages page={page.toLowerCase()}  render={(data,reload)=> {
                                        console.log(data);
                                        return (<Outlet context={{data}}/>
                                    )}} />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    );
}

export default Dashboard;
