import React from 'react';
import {toCurrency} from "../utils/functions";
import Link from "next/link";

function ProductBox({cols,colsMobile=2,data}) {
    return (
        <Link href={`/${data.slug}`} className={`col_${12/ cols} col_m_${12/ (colsMobile || 1)}  product-box`} style={{}}>
            <div className={'col-item-inner'}>
                <div className={'image-cover'}>
                    <img src={data?.mainImage} alt={data?.name}/>
                </div>
                <h3>{data?.name}</h3>
                <p> { toCurrency(data?.price)}</p>
            </div>
        </Link>
    );
}

export default ProductBox;
