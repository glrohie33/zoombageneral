import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {DEFAULTHEADERS, PAGEURL} from "../utils/texthelper";
import {CreateElement} from "../components/createElement";
import PageContent from "../components/pageContent";
import {useDispatch} from "react-redux";
import {Parser} from "html-to-react";
import DefaultLayout from "../layout/defaultLayout";
import Head from "next/head";
import axios from "axios";
const htmlToReact = new Parser();

function Page({content}) {

    const headers = useMemo(()=>{

        let {title,keywords,description,image} = DEFAULTHEADERS;
        const url = "";
        if(content.view === 'productView'){
            const {productDetails:{tags,description:productDescription,name,mainImage}} = content;
            keywords = tags.join(',');
            description = productDescription.replace(/(?:\\[rn])+/g, "");
            title= `Zoomba Kampe || ${name}`;
            image= mainImage;
        }

        return(<Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name={'keywords'} content={keywords}/>
                <meta name={'site_name'} content={'Zoomba Nigeria'}/>
                <meta name={'image'} content={image}/>
                <meta name={'title'} content={title}/>
                <meta name={'url'} content={url}></meta>
                {/*schema markup for google+*/}
                <meta itemProp='description' content={description}/>
                <meta itemProp={'keywords'} content={keywords}/>
                <meta itemProp={'site_name'} content={'Zoomba Nigeria'}/>
                <meta itemProp={'image'} content={image}/>
                {/*twitter card */}
                <meta name={'twitter:card'} content={'summary_large_image'}/>
                <meta name={'twitter:title'} content={title}/>
                <meta name={'twitter:description'} content={'Zoomba Nigeria'}/>
                <meta name={'twitter:image:src'} content={image}/>

                {/*    open Graph*/}
                <meta property='og:description' content={description}/>
                <meta property={'og:keywords'} content={keywords}/>
                <meta property={'og:site_name'} content={'Zoomba Kampe'}/>
                <meta property={'og:image'} content={image}/>
                <meta property={'og:title'} content={title}/>
                <meta property={'og:url'} content={url}/>

            </Head>
        )

    },[content])

    return (
        <>
            <section className={'row'}>
            {
                content.contents &&
                <PageContent contents={content.contents}/>

            }
            {
                CreateElement(content.view,{content})
            }
            {
                (content.textContent) &&
                <div className={'col card text-content'}>
                    {
                        htmlToReact.parse(content.textContent)
                    }
                </div>

            }

        </section>
        </>

    );
}

export async function getServerSideProps({req,query,path,params,resolvedUrl}){
    let content = {};
    try {
        const url=`${PAGEURL}${resolvedUrl}`
        const {status,data} = await axios.get(url,{
            headers:{
                platform:'zoomba'
            }
        });
        if(status){
            content = data
        }

    }catch (e) {
        console.log(e.message);
    }


    return {
        props:{
            content
        }
    }

}

Page.getLayout  = function getLayout(page){
    return(
            <DefaultLayout>
                {page}
            </DefaultLayout>
        )
}

export default Page;

