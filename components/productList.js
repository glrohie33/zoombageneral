import React from 'react';
import {CreateElement} from "./createElement";
import { Rating} from "@mui/material";
import AttributesList from "./attributesList";
import Pagination from "./pagination";
import {useRouter} from "next/router";

function ProductList({content}){

    const router = useRouter();
    const {currentPage} = router.query;
    return (
        <div className={'col flex product-list flex-wrap'}>
            <div className="col_3 product-list-sidebar">
                <div className="card">
                    <div className="content">
                        <div className="sidebar-component">
                            <h3>Category</h3>
                            {
                                content.mainCategory
                                &&
                                <a href={`/${content.mainCategory.slug}`} className={'main_category'}>{content.mainCategory.name}</a>
                            }
                            <div className={'side-content'}>
                                    {
                                        content.categoryChildren?.categories?.map((child)=>(
                                            <a href={`/${child.slug}`} className={'category_list'} key={child.id}>{child.name}</a>
                                        ))
                                    }
                            </div>

                        </div>
                        <div className="sidebar-component">
                            <h3>Brand</h3>
                        </div>
                        <div className="sidebar-component">
                            <h3>Rating</h3>
                            <div className="content">
                                <a href={'/'} className={'rating'}>
                                    <Rating value={5} className={'rating-stars'} />
                                </a>
                                <a href={'/'} className={'rating'}>
                                    <Rating value={4} className={'rating-stars'}/>
                                </a>
                                <a href={'/'} className={'rating'} >
                                    <Rating value={3} className={'rating-stars'}/>
                                </a>
                                <a href={'/'} className={'rating'} >
                                    <Rating value={2} className={'rating-stars'}/>
                                </a>
                                <a href={'/'} className={'rating'}>
                                    <Rating value={1} className={'rating-stars'}/>
                                </a>
                            </div>
                        </div>
                        {
                            content.attributes&&
                            <AttributesList attributes={content.attributes}/>
                        }
                    </div>
                </div>
            </div>
            <div className="col_9 product-list-list">
                {

                    <div className="card">
                        <div className="title">
                            <h3>{content.name}</h3>

                        </div>
                        <div className="content">
                            <div className="flex flex-wrap productList">
                                {
                                    content.productList?.products?.map((data,index)=>(
                                        CreateElement('productBox',{data,cols:4,key:index})
                                    ))
                                }
                            </div>
                            <div>
                                <Pagination currentPage={currentPage||1} perPage={20} total={content.productList.total}></Pagination>
                            </div>

                        </div>
                    </div>

                }
            </div>
        </div>
    );
}

export default ProductList;
