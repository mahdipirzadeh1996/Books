import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import { Link } from 'react-router-dom';
import { Close, Add } from "@material-ui/icons";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom";

import "./bookItem.scss";
import { getBook } from '../../context/bookContext/apiCalls';
import { BookContext } from "../../context/bookContext/BookContext";
import NavbarBook from "../../component/navbar/NavbarBook";

import logo from "../../images/medilogo.png";
import poster from "../../images/poster.jpg";

const override = css`
  display: block;
`;

const test = "تلاش بشر برای درمان بیماری‌ها و آسیب‌ها از دوران پیش از باستان وجود داشته است و در دوران باستان نیز در کنار مذهب و گاه به عنوان بخشی از آن وجود داشته است. توسط پزشکان مسلمانی همچون ابن‌سینا و رازی طی شد. در رنسانس با بهره گیری از روش ع.لمی پزشکی پیشرفت‌های قابل توجهی کرد. از قرن ۱۹ آنچه به عنوان پزشکی مدرن شناخته می‌شود بنیان گذاشته شد"

const BookItem = () => {
    const [orientation, setOrientation] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [dialog, setDialog] = useState(false);

    const params = useParams();
    const { book, dispatchh, isFetching } = useContext(BookContext);

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const history = useHistory();
    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("phone")) || null;
        temp !== null && setUser(temp.result[0].phone);

        getBook(params.name, dispatchh);

        // const handleResize = () => {
        //     setWindowWidth(window.innerWidth);
        //     setWindowHeight(window.innerHeight);

        //     if (windowWidth > windowHeight) {
        //         setOrientation('landscape-primary');
        //     } else {
        //         setOrientation('portrait-primary');
        //     }
        //     console.log(orientation)
        // };
        // const handleResize = () => {
        //     setWindowWidth(window.innerWidth);
        //     console.log(windowWidth);
        // }
        // window.addEventListener("resize", handleResize);
        // return () => {
        //     window.removeEventListener("resize", handleResize);
        // };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
            if (windowWidth > windowHeight) {
                setOrientation('landscape-primary');
            } else {
                setOrientation('portrait-primary');
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const handleBuy = (e) => {
        e.preventDefault();

        setDialog(true);
    }

    return (
        <div style={{ position: 'relative' }}>
            <NavbarBook />

            {isMobile ?
                <div className={!isFetching ? 'bookItem' : 'bookItem bookItemClose'}>
                    <div className={"bookContainer"}>
                        <div className={"mask"} />
                        <div className={"contentMob"} style={{ flexDirection: orientation === 'portrait-primary' ? "column" : "row" }}>
                            <div className='topPart'>
                                <div className='posterContainer'>
                                    <img src={book !== null && window.$domain + book[0].img} style={{ display: !loading ? "block" : "none" }} onLoad={() => setLoading(false)} alt='' />
                                    <div className={loading ? "loaderContainer" : "loaderContainer hide"}>
                                        <DotLoader color={"#34b7f1"} loading={loading} css={override} size={60} />
                                    </div>
                                </div>
                            </div>
                            <div className='bottomPart'>
                                <div className='bottomContent'>
                                    <div className='firstBottomContent'>
                                        <h1 style={{ marginLeft: '10px' }}>{book !== null && (book[0].isBook === 1 ? "کتاب:" : "جزوه:")}</h1>
                                        <h1>{book !== null ? book[0].name : ""}</h1>
                                    </div>
                                    <div className='rankContainer'>
                                        <h1>
                                            سال انتشار:
                                        </h1>
                                        <h3>
                                            ({book !== null ? book[0].year : ""})
                                        </h3>
                                    </div>
                                </div>

                                <div className={"seperator"} />

                                <div className={"descContent"}>
                                    <h2>
                                        :توضیحات کتاب
                                    </h2>
                                    <h3>{book !== null ? book[0].explaine : ""}</h3>
                                </div>

                                <div className={"seperator"} />

                                <div className={"moreContainer"}>
                                    <div className={"more"}>
                                        <div className={"moreContent"}>
                                            <h3 className={"title"}>نویسنده:</h3>
                                            <h3 className={"contentTxt"}>{book !== null ? book[0].writer : ""}</h3>
                                        </div>
                                        <div className={"moreContent"}>
                                            <h3 className={"title"}>تعداد صفحات:</h3>
                                            <h3 className={"contentTxt"}>{book !== null ? book[0].pages : ""}</h3>
                                        </div>
                                        <div className={"moreContent"}>
                                            <h3 className={"title"}>سال:</h3>
                                            <h3 className={"contentTxt"}>({book !== null ? book[0].year : ""})</h3>
                                        </div>
                                        <div className={"moreContent"}>
                                            <h3 className={"title"}>دسته:</h3>
                                            <h3 className={"contentTxt"}>{book !== null ? book[0].cat1 : ""}</h3>
                                        </div>
                                        {
                                            book !== null && ((book[0].cat2 !== null && book[0].cat2 !== "null") &&
                                                <div className={"moreContent"} style={{ marginRight: "20px" }}>
                                                    <h3 className={"title"} style={{ color: "rgb(255, 153, 0)" }}>زیر دسته:</h3>
                                                    <h3 className={"contentTxt"}>{book[0].cat2}</h3>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className={"seperator"} />

                                <div className='moreContainer' style={{ alignItems: 'center' }}>
                                    <h1>قیمت:</h1>
                                    <h2>{book !== null && Number(book[0].price).toLocaleString()}</h2>
                                    <h2>ریال</h2>
                                </div>
                                <div className='moreContainer'>
                                    <div className='buyContainer' onClick={handleBuy}>خرید</div>
                                    <Link to={{
                                        pathname: "/bookdemo",
                                        state: book !== null && book[0].name
                                    }}>
                                        <div className='buyContainer'>دمو</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <img className={"back"} src={poster} alt={""} />
                    </div>

                    <div className={dialog ? 'alertMob' : 'alertMob alertMobClose'}>
                        <div
                            className='alertContainer'
                        >
                            <h1>جهت خرید وارد حساب کاربری خود شوید</h1>
                            <div className='submitBtn'>
                                ورود به حساب
                            </div>
                            <span onClick={() => user !== null ?
                                history.push({ pathname: "/buypage", from: "book" })
                                :
                                history.push({ pathname: "/auth", from: "book" })
                            }>
                                <Add className={"icon"} />
                                ثبت حساب کاربری
                            </span>
                            <div className='closeBtn' onClick={() => setDialog(false)}>
                                <Close className={"icon"} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={!isFetching ? 'bookItem' : 'bookItem bookItemClose'}>
                    <div className={"bookContainer"}>
                        <div className={"mask"} />
                        <div className={"content"}>
                            <div className={"leftPart"}>
                                <div className='posterContainer'>
                                    <img src={book !== null && window.$domain + book[0].img} style={{ display: !loading ? "block" : "none" }} onLoad={() => setLoading(false)} alt='' />
                                    <div className={loading ? "loaderContainer" : "loaderContainer hide"}>
                                        <DotLoader color={"#34b7f1"} loading={loading} css={override} size={60} />
                                    </div>
                                </div>
                            </div>
                            <div className={"rightPart"}>
                                <div className={"rightContent"}>
                                    <div className={"firstRightContent"}>
                                        <h1 style={{ marginLeft: '20px' }}>{book !== null && (book[0].isBook === 1 ? "کتاب:" : "جزوه:")}</h1>
                                        <h1>{book !== null ? book[0].name : ""} </h1>
                                    </div>
                                    <div className={"rankContainer"}>
                                        <h1>
                                            سال انتشار:
                                        </h1>
                                        <h3>
                                            ({book !== null ? book[0].year : ""})
                                        </h3>
                                    </div>
                                </div>

                                <div className={"seperator"}>a</div>

                                <div className={"descContent"}>
                                    <h2>
                                        :توضیحات کتاب
                                    </h2>
                                    <h3>{book !== null ? book[0].explaine : ""}</h3>
                                </div>

                                <div className={"seperator"}>a</div>

                                <div className={"moreContainer"}>
                                    <div className={"more"}>
                                        <div className={"moreContent"}>
                                            <h3 className={"title"}>نویسنده:</h3>
                                            <h3 className={"contentTxt"}>{book !== null ? book[0].writer : ""}</h3>
                                        </div>
                                        <div className={"moreContent"}>
                                            <h3 className={"title"}>تعداد صفحات:</h3>
                                            <h3 className={"contentTxt"}>{book !== null ? book[0].pages : ""}</h3>
                                        </div>
                                        <div className={"moreContent"}>
                                            <h3 className={"title"}>سال:</h3>
                                            <h3 className={"contentTxt"}>({book !== null ? book[0].year : ""})</h3>
                                        </div>
                                    </div>
                                    <div className={"more"}>
                                        <div className={"moreContent"}>
                                            <h3 className={"title"}>دسته:</h3>
                                            <h3 className={"contentTxt"}>{book !== null ? book[0].cat1 : ""}</h3>
                                        </div>
                                        {
                                            book !== null && ((book[0].cat2 !== null && book[0].cat2 !== "null") &&
                                                <div className={"moreContent"} style={{ marginRight: "20px" }}>
                                                    <h3 className={"title"} style={{ color: "rgb(255, 153, 0)" }}>زیر دسته:</h3>
                                                    <h3 className={"contentTxt"}>{book[0].cat2}</h3>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className={"seperator"}>a</div>

                                <div className='moreContainer' style={{ alignItems: 'center' }}>
                                    <h1>قیمت:</h1>
                                    <h2>{book !== null && Number(book[0].price).toLocaleString()}</h2>
                                    <h2>ریال</h2>
                                </div>
                                <div className='moreContainer'>
                                    <div className='buyContainer' onClick={handleBuy}>خرید</div>
                                    <Link to={{
                                        pathname: "/bookdemo",
                                        state: book !== null && book[0].name
                                    }}>
                                        <div className='buyContainer'>دمو</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <img className={"back"} src={poster} alt={""} />
                    </div>

                    <div className={dialog ? 'alert' : 'alert alertClose'}>
                        <div
                            className='alertContainer'
                        >
                            <h1>جهت خرید وارد حساب کاربری خود شوید</h1>
                            <div className='submitBtn'>
                                ورود به حساب
                            </div>
                            <span onClick={() => user !== null ?
                                history.push({ pathname: "/buypage", from: "book" })
                                :
                                history.push({ pathname: "/auth", from: "book" })
                            }>
                                <Add className={"icon"} />
                                ثبت حساب کاربری
                            </span>
                            <div className='closeBtn' onClick={() => setDialog(false)}>
                                <Close className={"icon"} />
                            </div>
                        </div>
                    </div>

                    {/* <div className='alert'>
                <div
                    className='alertContainer'
                    style={{ 
                        paddingBottom: orientation === 'landscape-primary' ? '40px' : '10px',
                        paddingTop: orientation === 'landscape-primary' ? '40px' : '10px'
                     }}
                >
                    <h1>جهت خرید وارد حساب کاربری خود شوید</h1>
                    <div className='submitBtn'>
                        ورود به حساب
                    </div>
                    <span>
                        ثبت حساب کاربری
                    </span>
                    <div className='closeBtn'>
                        <Close className={"icon"} />
                    </div>
                </div>
            </div> */}
                </div>
            }
            <div className={isFetching ? 'loading' : "loading loadingClose"}>
                <DotLoader color={"#34b7f1"} loading={isFetching} css={override} size={60} />
            </div>
        </div>
    )
}

export default BookItem;