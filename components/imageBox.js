import React from 'react';

function ImageBox({cols,colsMobile=2,data}) {
    return (
        <a href={data.link} className={`col_${12/ cols} col_m_${12/ (colsMobile || 12) } image-box`} style={{}}>
            <div className={'col-item-inner'}>
                <img src={data?.url} alt={data?.title}/>
                <h3>{data?.title}</h3>
            </div>
        </a>
    );
}

export default ImageBox;