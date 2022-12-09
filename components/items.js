import React,{Fragment} from 'react';
import {CreateElement} from "./createElement";

function Items({items,viewType,...props}) {
    const viewList ={
        productList:'productBox',
        links:'imageBox',
        slides:'imageBox',
    }


    return (
        <Fragment>
            {
                items.map((item,index)=>{
                        props.data = item;
                        props.key = item.id;
                        return (
                                CreateElement(viewList[viewType], props)
                        )
                    }

                )
            }
        </Fragment>
    );
}

export default Items;
