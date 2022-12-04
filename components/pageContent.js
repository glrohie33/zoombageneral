import React, {Fragment} from 'react';
import Items from "./items";

function PageContent({contents}) {
    return (
        <Fragment>
            {
                contents?.map((content,index)=>{
                    let className = [];
                    if(content.hideImageName){
                        className.push('no-image-name')
                    }
                    return(
                        <div className={'col'} key={index}>
                            <div className={'card'}>
                                {
                                    content.title&&(<div className={'title'}>
                                        <h3>{content.title}{
                                            content.subtitle&&
                                            <span className={'subtitle'}>{content.subtitle}</span>
                                        }</h3>
                                    </div>)
                                }

                                <div className={`flex flex-wrap space-between  ${className.join(' ')} ${content.type} ${content.colsMobile}`}>
                                    {
                                        <Items items={content.items} viewType={content.type}  cols={content.cols} colsMobile={content.colsMobile}/>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    );
}

export default PageContent;