import React, { useState, useEffect, useContext } from 'react';
import { isMobile } from "react-device-detect";
import {
    ArrowDropDown,
    Notifications,
    Search,
    MenuBook,
    Home,
    AccountCircle,
    ShoppingCart,
    ExitToApp,
    Assignment,
    LibraryBooks
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in/lib/FadeIn";
import useScreenOrientation from 'react-hook-screen-orientation';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";

import "./navbar.scss";
import logo from "../../images/medilogo.png";
import poster from "../../images/test.jpg";
import { ValidateContext } from '../../context/validContext/ValidateContext';
import { logoutSuccess } from '../../context/validContext/apiCalls';
import { BookContext } from '../../context/bookContext/BookContext';
import { getRand } from '../../context/bookContext/apiCalls';

const override = css`
  display: block;
`;

const test = "تلاش بشر برای درمان بیماری‌ها و آسیب‌ها از دوران پیش از باستان وجود داشته است و در دوران باستان نیز در کنار مذهب و گاه به عنوان بخشی از آن وجود داشته است. توسط پزشکان مسلمانی همچون ابن‌سینا و رازی طی شد. در رنسانس با بهره گیری از روش ع.لمی پزشکی پیشرفت‌های قابل توجهی کرد. از قرن ۱۹ آنچه به عنوان پزشکی مدرن شناخته می‌شود بنیان گذاشته شد"

const Navbar = () => {
    const [phone, setPhone] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const { dispatch } = useContext(ValidateContext);
    const { book, dispatchh } = useContext(BookContext);

    const screenOrientation = useScreenOrientation();

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("phone")) || null;
        temp !== null && setPhone(temp.result[0].phone);

        console.log(phone);

        const getRandom = () => {
            getRand(dispatchh);
        }
        getRandom();
    }, []);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset > 0);
        return () => (window.onscroll = null);
    }

    const handleLogout = (e) => {
        e.preventDefault();

        logoutSuccess(dispatch);
        localStorage.removeItem("phone");
    }

    return (
        <div className={isScrolled ? "navbarFeature scrolled" : "navbarFeature"}>
            <div className={isScrolled ? "navbar scrolled" : "navbar"}>
                {isMobile
                    ?
                    <div className={"containerMob"}>
                        <div className={"leftMob"}>
                            <div className={open ? "menu" : "menu menuClose"} style={{ width: screenOrientation === 'landscape-primary' ? '30%' : '60%' }}>
                                <div className={"header"}>
                                    <img className={screenOrientation === 'landscape-primary' ? "imgMob" : "img"} src={logo} alt={""} />
                                    <div className={"phoneContainer"}>
                                        <span>{phone !== null && phone}</span>
                                    </div>
                                </div>
                                <div className={"body"}>
                                    <h1>
                                        خانه
                                        <Home className={"iconn"} />
                                    </h1>
                                    <Link to={"/books"} className={"link"}>
                                        <h1>
                                            کتاب
                                            <MenuBook className={"iconn"} />
                                        </h1>
                                    </Link>
                                    <Link to={"/articles"} className={"link"}>
                                        <h1>
                                            جزوه
                                            <Assignment className={"iconn"} />
                                        </h1>
                                    </Link>
                                    <Link to={"/search"} className={"link"}>
                                        <h1>
                                            جستجو
                                            <Search className={"iconn"} />
                                        </h1>
                                    </Link>
                                    <h1>
                                        کتابخانه من
                                        <LibraryBooks className={"iconn"} />
                                    </h1>
                                    {phone !== null &&
                                        <h1 onClick={handleLogout}>
                                            خروج
                                            <ExitToApp className={"iconn"} />
                                        </h1>
                                    }
                                </div>
                            </div>
                            <button className={"btn"} onClick={() => setOpen(!open)}>
                                <div className={open ? "first" : "firstClose"} />
                                <div className={open ? "second" : "secondClose"} />
                                <div className={open ? "third" : "thirdClose"} />
                            </button>
                        </div>
                        <div className={"rightMob"}>
                            <h1 style={{ textAlign: "left", ontSize: "45px", color: "white", fontFamily: "sign" }}>Medi Books</h1>
                        </div>
                    </div>
                    :
                    <div className={"container"}>
                        <div className={"left"}>
                            {phone !== null &&
                                <div className={"phone"}>
                                    <AccountCircle className={"iconn"} />
                                    <div className={"phoneContainer"}>
                                        <span>{phone}</span>
                                    </div>
                                </div>
                            }
                            {phone !== null &&
                                <div className={"profile"}>
                                    <ArrowDropDown className={"icon"} />
                                    <div className={"options"} onClick={handleLogout}>
                                        <span>خروج</span>
                                    </div>
                                </div>
                            }
                            <Link to={"/search"} className={"link"}>
                                <Search className={"icon"} />
                            </Link>
                            <Notifications className={"icon"} />
                        </div>

                        <div className={"right"}>
                            {/* <span>New and Popular</span>
                                <span>My List</span> */}
                            <span>کتابخانه من</span>
                            <Link to={"/articles"} className={"link"}>
                                <span>جزوه ها</span>
                            </Link>
                            <Link to={"/books"} className={"link"}>
                                <span>کتاب ها</span>
                            </Link>
                            <Link to={"/"} className={"link"}>
                                <span>خانه</span>
                            </Link>
                            <img src={logo} alt='' />
                        </div>
                    </div>
                }
            </div>

            <FadeIn>
                <div className={isScrolled ? "posterContainer scrolled" : "posterContainer"}>
                    {/* <img className={"poster"} src={poster} alt={""} /> */}
                    {book !== null
                        ?
                        screenOrientation === 'landscape-primary'
                            ?
                            <>
                                <div className={"imgContainer"}>
                                    <img style={{ display: !loading ? "block" : "none" }} className={"poster"} src={process.env.REACT_APP_DOMAIN + book[0].img} alt={""} onLoad={() => setLoading(false)} />
                                    <div className={!isScrolled ? (loading ? "loaderContainer" : "loaderContainer hide") : "loaderContainer hide"}>
                                        <DotLoader color={"#34b7f1"} loading={loading} css={override} size={60} />
                                    </div>
                                </div>
                                <div className={"titleContainer"}>
                                    <h1>
                                        {book[0].name}
                                    </h1>
                                    <span>
                                        {book[0].explaine}
                                    </span>
                                    <Link className="link" to={`/book/${book[0].name}`} target={"_blank"}>
                                        <div className='seeBook'>
                                            <h1 className='seeBookTitle'>بیشتر</h1>
                                        </div>
                                    </Link>
                                </div>
                            </>
                            :
                            <div className={"imgContainer"}>
                                <div className={!loading ? 'moreContainer' : "loaderContainer hide"}>
                                    <img style={{ display: !loading ? "block" : "none" }} className={"posterMob"} src={process.env.REACT_APP_DOMAIN + book[0].img} alt={""} onLoad={() => setLoading(false)} />
                                    <Link className="link" to={`/book/${book[0].name}`} target={"_blank"}>
                                        <div className='moreBtn' style={{ display: !isScrolled ? "flex" : "none" }}>
                                            <ShoppingCart className={"moreIcon"} />
                                        </div>
                                    </Link>
                                </div>
                                <div className={loading ? "loaderContainerMob" : "loaderContainer hide"}>
                                    <DotLoader color={"#34b7f1"} loading={loading} css={override} size={60} />
                                </div>
                            </div>
                        :
                        null
                    }
                </div>
            </FadeIn>
        </div>
    )
}

export default Navbar;