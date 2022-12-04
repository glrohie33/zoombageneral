import React, {useMemo} from 'react';
import Link from "next/link";

function PaginationLink({value,name,children,search="",isCurrent=false}) {
    const url = useMemo(()=>{
        console.log(search);
        const newurl = new URLSearchParams(search);
        if (newurl.has('currentPage')){
            newurl.set('currentPage',value);
        }else{
            newurl.append('currentPage',value);
        }
        return newurl.toString();
    },[search,value]);

    return (
        <Link href={`?${url}`} className={`btn pg-btn ${isCurrent?'btn-orange':'btn-default'}`}>
            {
                children
            }
        </Link>
    );
}

export default PaginationLink;
