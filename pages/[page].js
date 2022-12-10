import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {DEFAULTHEADERS, PAGEURL} from "../utils/texthelper";
import {CreateElement} from "../components/createElement";
import PageContent from "../components/pageContent";
import {useDispatch} from "react-redux";
import {Parser} from "html-to-react";
import DefaultLayout from "../layout/defaultLayout";
import Head from "next/head";
import axios from "axios";
import {loadMeta} from "../utils/functions";
const htmlToReact = new Parser();

function Page({content,url}) {

    const headers = useMemo(()=>{

        let {title,keywords,description,image,type} = DEFAULTHEADERS;
        let metaUrl = url
        if(content.view === 'productView'){
            const {productDetails:{tags,description:productDescription,name,mainImage}} = content;
            keywords = tags.join(',');
            description = productDescription.replace(/(?:\\[rn])+/g, "");
            title= `Zoomba Kampe || ${name}`;
            image= mainImage;
            type='product'
        }

        if(content.view === 'productList'){
            const {mainCategory} = content;
             title = mainCategory.title;
             keywords = mainCategory.tags.join(',');
             metaUrl = `/${mainCategory.slug}`
        }

        return(<Head>
                {
                    loadMeta({
                        keywords,
                        title,
                        description,
                        url:metaUrl,
                        image,
                        type
                    })
                }
            </Head>
        )

    },[content])

    return (
        <>
            {
                headers
            }
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
            console.log(data);
            content = data
        }

    }catch (e) {
        console.log(e.message);
    }


    return {
        props:{
            content,
            url:resolvedUrl
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

