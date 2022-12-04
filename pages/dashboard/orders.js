import React from 'react';
import {formatDate, formatToString, toCurrency} from "../../utils/functions";
import OrderItems from "./orderItems";
import Pagination from "../../components/pagination";
import DashboardLayout from "../../layout/dashboardLayout";
import {useSelector} from "react-redux";
import {REQUESTURL} from "../../utils/texthelper";
import {patch} from "../../actions/auth";

function Orders(props) {
    const {data,loadData} = props;
  const  {orders=[],perPage,currentPage,total} = data?.orders || {};
  const {auth:{user:{role={}}}} = useSelector(s=>s);

  function getRequest(request){
      if(!request && request.length === 0){
          return ""
      }
      const {data,_id} = request[0];
      const dataDecoded = JSON.parse(data);
      return (
          <div>

              {
              Object.keys(dataDecoded).map((key)=>(

                  <p key={key}><strong>{formatToString(key)}:</strong>{dataDecoded[key]}</p>
              ))
              }
              <div className={'flex flex-center'}>
                  {
                      (role === 'finance-manager') &&
                      <>
                          <a className={'btn'} id={_id} data-status='true' onClick={setRequestStatus}>Approve</a>
                          <a className={'btn'} id={_id} data-status='false' onClick={setRequestStatus}>Reject</a>
                      </>
                  }
              </div>
      </div>

      )
  }

  function setRequestStatus({target}){
      const {id,dataset:{status}}=target;

      console.log(target.id);
      const finalStatus = (status == 'true');
      patch(`${REQUESTURL}/${id}`,{status:finalStatus}).then(res=>{
          console.log('success');
          loadData();
      }).catch(e=>{
          console.log(e);
      })
  }

    return (
        <>
            <div className={'flex flex-wrap'}>
            {
                orders?.map(order=>(
                    <div className={'col_12'} key={order.id}>
                        <div className="col">
                            <div className="card order-item">
                                <div className="title">
                                    <h3>{order.paymentStatus}</h3>
                                    <div className="order-data">
                                        <span className={'date'}>
                                            Order Date: {formatDate(order.createdAt)}
                                        </span>

                                    </div>
                                </div>
                                <div className="content">
                                    <OrderItems items={order.orderItems}/>
                                    <div className={'requests'}>
                                        {
                                            getRequest(order.requests)
                                        }
                                    </div>
                                </div>
                                <div className="footer">
                                    <h3 className={'payment-gateway'}>{toCurrency(order.grandTotal)}</h3>

                                    <a className={'btn'} href={'/orders/'}>View</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
            <Pagination currentPage={currentPage} perPage={perPage} total={total} />
        </>

    );
}
Orders.getLayout = function getLayout(page){
    return (<DashboardLayout page={'orders'}>
            {page}
        </DashboardLayout>
    )
}
export default Orders;
