import React from 'react';
import Footer from "../components/footer";
import Displayalerts from "../components/displayAlert";
import Header from "../components/header";
import {AUTHALERTNAME} from "../utils/texthelper";

function DefaultLayout({children}) {
    return (
        <>
            <Displayalerts name={AUTHALERTNAME}></Displayalerts>
            <Header className="App-header">
            </Header>
            <main className="page-content">
                {children}
            </main>
            <Footer className="App-footer"></Footer>
        </>
    );
}



export default DefaultLayout;
