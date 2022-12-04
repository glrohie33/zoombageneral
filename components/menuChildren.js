import React, {memo} from 'react';

function MenuChildren({categories}) {
    return (
        <div className={`category-children ${categories.length > 0 ?'active':''}` }>
            {
                categories.map(category=>(
                    <div className="col_4" key={category.id}>
                        <a className={'child-category'} href={`/${category.slug}`} >{category.name}</a>
                        <ul className={'inner-menu'}>
                            {
                                category.children.map(category=>(
                                    <a className={'parent-categories'} href={`/${category.slug}`} >{category.name}</a>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </div>
    );
}

export default memo(MenuChildren);