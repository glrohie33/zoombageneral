import React from 'react';
import DashboardLayout from "../../layout/dashboardLayout";
import Orders from "./orders";

function OrderRequest(props) {
    return (
        <Orders data={props.data} loadData={props.loadData}/>
    );
}

OrderRequest.getLayout = function getLayout(page){
    return (<DashboardLayout page={'orderRequests'}>
            {page}
        </DashboardLayout>
    )
}

OrderRequest.getInitialProps = ()=>{
    return {}
}
export default OrderRequest;
