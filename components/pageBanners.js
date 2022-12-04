import React, {useEffect, useState} from 'react';
import {ArrowBack, ArrowForward} from "@mui/icons-material";

function PageBanners({banners :{sideBanners=[],sliders=[]}}) {

    const [currentSlide,setCurrentSlide] = useState(0);
    let interval = null;
    function changeSlide({target}){
        if(interval){
            clearInterval(interval);
        }
        const {dataset:{value}} = target;
        nextSlide(value);
    }

    function nextSlide(value){
        let nextSlide = Number(value) + Number(currentSlide);

        if(nextSlide < 0){
            nextSlide =  sliders.length - 1;
        }
        if(nextSlide === sliders.length){
            nextSlide  = 0;
        }
        setCurrentSlide(nextSlide);
        if(!interval){
            startInterval();
        }
    }

    function startInterval(){
        // interval = setInterval(()=>{
        //     nextSlide(1);
        // },4000)
    }

    useEffect(()=>{
        return ()=>{
         if (interval){
             clearInterval(interval);
         }
        }
    },[interval])



    return (
        <div className={'col flex'}>
            <div className={'home-slider flex'}>
                {
                    sliders.map((slider,index)=>(
                        <a href={slider.link} className={`flex slider ${(index===currentSlide)?'active':''}`} title={slider.name} key={slider.id}>
                            <img src={slider.url} alt={slider.name} />
                        </a>
                    ))
                }
                <div className="arrows prev" >
                    <ArrowBack onClick={changeSlide} data-value={-1} />
                </div>
                <div className="arrows next">
                    <ArrowForward onClick={changeSlide} data-value={+1}/>
                </div>
            </div>

            {
                sideBanners.length > 0 &&
                <div className={'home-banner flex'}>

                    {
                        sideBanners.map(banner=>(
                            <div className={'banner'}  key={banner.id}>
                                <a href={banner.link} title={banner.name}>
                                    <img src={banner.url} alt={banner.name}/>
                                </a>
                            </div>
                        ))
                    }
                </div>

            }
        </div>
    );
}

export default PageBanners;