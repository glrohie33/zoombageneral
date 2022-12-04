import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {get} from "../actions/auth";
import PageContent from "../components/pageContent";
import PageBanners from "../components/pageBanners";
import {PAGEURL} from "../utils/texthelper";
import DefaultLayout from "../layout/defaultLayout";
function Home({pageContent}) {

    return (
        <Fragment>
            <section className={'row flex flex-w'}>

                {
                    pageContent['pageBanners'] &&
                    <PageBanners banners={pageContent.pageBanners} />

                }

                {
                    pageContent.contents &&
                    <PageContent contents={pageContent.contents}/>
                }

            </section>
        </Fragment>
    );
}

export async function getServerSideProps(context){
        let pageContent = null;
        try {
            const {status,data} = await get(PAGEURL);
            if(status){
                pageContent = data;
            }
        }catch (e){
            console.log(e.message)
        }

    return{
        props:{
            pageContent
        }
    }

}

Home.getLayout = function getLayout(page){
    return (
        <DefaultLayout>
            {page}
        </DefaultLayout>
    )
}
export default Home;
