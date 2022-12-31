import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { isMobile } from "react-device-detect";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";

import "./bookDemo.scss";
import { getPdf } from "../../context/bookContext/apiCalls";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const override = css`
  display: block;
`;

const BookDemo = () => {
    const location = useLocation();
    const history = useHistory();

    const [demo, setDemo] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (location.state === undefined) {
            history.push("/")
        }
        getPdf(setDemo, location.state);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const page = [];

    for (let i = 1; i <= 10; i++) {
        page.push(
            <Page width={isMobile ? width - 100 : null} pageNumber={i} >
                <article style={{ height: isMobile ? height : '850px' }}>
                    {
                        i % 2 !== 0
                            ?
                            <>
                                <div className={"maskL"} />
                            </>
                            :
                            <>
                                <div className={"maskR"} />
                            </>
                    }
                </article>
            </Page>
        );
    }

    return (
        <div className='BookDemo'>
            {
                isMobile ?
                    <Document file={demo} onLoadError={(e) => alert('مجددا تلاش کنید!')}>
                        <HTMLFlipBook
                            width={width - 100}
                            height={height}

                            maxShadowOpacity={0.5}
                            mobileScrollSupport={false}
                            onInit={() => setLoader(false)}
                        >
                            {page.map((item, index) => (
                                <div key={index}>
                                    {item}
                                </div>
                            ))}
                        </HTMLFlipBook>
                    </Document >
                    :
                    <div className='bookContainer'>
                        <Document file={demo} onLoadError={(e) => alert('مجددا تلاش کنید!')}>
                            <HTMLFlipBook
                                width={600}
                                height={850}
                                size="stretch"
                                maxShadowOpacity={0.5}
                                mobileScrollSupport={true}
                                className={'book'}
                                getOrientation
                                onInit={() => setLoader(false)}
                            >
                                {page.map((item, index) => (
                                    <div key={index}>
                                        {item}
                                    </div>
                                ))}
                            </HTMLFlipBook>
                        </Document >
                    </div>
            }
            {loader ?
                <div className='loader'>
                    <DotLoader color={"#34b7f1"} loading={true} css={override} size={60} />
                </div>
                :
                null
            }
        </div>
    )
}

export default BookDemo;