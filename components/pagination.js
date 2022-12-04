import React, {Fragment,} from 'react';
import PaginationLink from "./paginationLink";
import {
    ChevronLeft,
    ChevronRight, FirstPage,
    LastPage
} from "@mui/icons-material";
import {useRouter} from "next/router";

function Pagination({max,currentPage,total,numberOfViews=3,perPage=20}) {
    //this is to return 1 incase the start index goes to negative
    const router = useRouter();
    const startIndex = Math.max(currentPage - numberOfViews,0) + 1;
    const totalPage = Math.ceil(total/perPage);
    const totalLinks = (totalPage < 3)?totalPage:numberOfViews;
    const items = Array(totalLinks).fill('');
    const {query:search} = router;

    return (
        <Fragment>
            {
                (totalPage>1) &&
                <div className={'flex flex-center'}>

                    {
                        currentPage>1&&
                        <Fragment>
                            <PaginationLink search={search} name={'page'} value={1}>
                                <ChevronLeft  fontSize={'small'}/>
                            </PaginationLink>
                            <PaginationLink search={search} name={'page'} value={currentPage - 1}>
                                <FirstPage fontSize={'small'}/>
                            </PaginationLink>
                        </Fragment>
                    }

                    {
                        items.map((item,index)=>(
                                <PaginationLink search={search} name={'page'} isCurrent={Number(currentPage) === (startIndex + index)}  key= {index} value={(startIndex+index)}>
                                    {
                                        (startIndex+index)
                                    }
                                </PaginationLink>
                            )
                        )
                    }

                    {
                        currentPage<totalPage&&
                        <Fragment>
                            <PaginationLink search={search} name={'page'} value={Number(currentPage) + 1}>
                                <ChevronRight fontSize={'small'}/>
                            </PaginationLink>
                            <PaginationLink search={search} name={'page'} value={totalPage}>
                                <LastPage fontSize={'small'}/>
                            </PaginationLink>
                        </Fragment>
                    }

                </div>
            }

        </Fragment>

    );
}

export default Pagination;
