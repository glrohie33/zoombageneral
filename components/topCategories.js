import React, {memo, useMemo, useState} from 'react';
import {getChildren} from "../utils/functions";
import MenuChildren from "./menuChildren";
function TopCategories({categories = [],mouseEnter}) {

    const categoryTree = useMemo(()=>{
           const children =  getChildren(1,null,categories)
           return children;
        }
    ,[categories]);

    const [children,setChildren] = useState([]);
    return (
        categories.length > 0 &&
        <div className={'top-categories'}>
            <ul className={'main-category'}>
                {
                    categoryTree.map(
                        category=>(
                                <li onMouseEnter={()=>setChildren(category.children)}  key={category.id}><a className={'parent-categories'} href={`/${category.slug}`} >{category.name}</a></li>
                    )
                    )
                }
            </ul>

            <MenuChildren categories={children} />
        </div>
    );
}

export default memo(TopCategories);
