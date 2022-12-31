import React, { useState, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { isMobile } from "react-device-detect";
import useScreenOrientation from 'react-hook-screen-orientation';

import "./home.scss";
import "./logo.css";
import Navbar from "../../component/navbar/Navbar";
import { userRows } from "../../dummyData";
import List from "../../component/list/List";
import { testUser } from '../../context/authContext/apiCalls';
import { AuthContext } from "../../context/authContext/AuthContext";
import { ListContext } from "../../context/listContext/ListContext";
import { getLists } from '../../context/listContext/apiCalls';
import logo from "../../images/medilogo.png";

const Home = ({ type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [list, setList] = useState([]);

    const { dispatch } = useContext(AuthContext);
    const { listDispatch } = useContext(ListContext);

    const screenOrientation = useScreenOrientation();

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true)
        }, 1000);
        testUser(dispatch);
        getLists(setList, listDispatch);

        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className={"home"}>
            <div className={"navContainer"}>
                <Navbar />
            </div>
            {list.map((list, index) => (
                <List type={type} list={list} key={index} />
            ))}
            <div data-aos={"fade-up"}>
                <div className='curve'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,32L48,69.3C96,107,192,181,288,202.7C384,224,480,192,576,154.7C672,117,768,75,864,80C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>                </div>
                {
                    isMobile
                        ?
                        <>
                            {
                                screenOrientation === 'landscape-primary'
                                    ?
                                    <div className='footerContainer' style={{ height: '40vh' }}>
                                        <div className='right' data-aos={"fade-down"}>
                                            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />

                                            <div class="wrapper" style={{ width: 'auto' }}>
                                                <ul style={{ display: 'flex' }}>
                                                    <li style={{ width: '40px', height: '40px' }} class="facebook"><a target={"_blank"}><i style={{ fontSize: '20px', marginTop: '34px' }} class="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                                                    <li style={{ width: '40px', height: '40px' }} class="telegram"><a target={"_blank"}><i style={{ fontSize: '20px', marginTop: '34px' }} class="fa fa-telegram fa-2x" aria-hidden="true"></i></a></li>
                                                    <li style={{ width: '40px', height: '40px' }} class="instagram"><a target={"_blank"}><i style={{ fontSize: '20px', marginTop: '34px' }} class="fa fa-instagram fa-2x" aria-hidden="true"></i></a></li>
                                                    <li style={{ width: '40px', height: '40px' }} class="whatsapp"><a target={"_blank"}><i style={{ fontSize: '20px', marginTop: '34px' }} class="fa fa-whatsapp fa-2x" aria-hidden="true"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='seperate' />

                                        <div className='left' data-aos={"fade-down"}>
                                            <h1 className='titleMob'>Medi Books</h1>
                                            <img className='logoMob' src={logo} alt='' />
                                        </div>
                                    </div>
                                    :
                                    <div className='footerContainer'>
                                        <div className='right' data-aos={"fade-down"}>
                                            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />

                                            <div class="wrapper" style={{ width: 'auto' }}>
                                                <ul style={{ display: 'flex' }}>
                                                    <li style={{ width: '40px', height: '40px' }} class="facebook"><a target={"_blank"}><i style={{ fontSize: '20px', marginTop: '34px' }} class="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                                                    <li style={{ width: '40px', height: '40px' }} class="telegram"><a target={"_blank"}><i style={{ fontSize: '20px', marginTop: '34px' }} class="fa fa-telegram fa-2x" aria-hidden="true"></i></a></li>
                                                </ul>
                                            </div>

                                            <div class="wrapper" style={{ width: 'auto', marginTop: '15px' }}>
                                                <ul style={{ display: 'flex' }}>
                                                    <li style={{ width: '40px', height: '40px' }} class="instagram"><a target={"_blank"}><i style={{ fontSize: '20px', marginTop: '34px' }} class="fa fa-instagram fa-2x" aria-hidden="true"></i></a></li>
                                                    <li style={{ width: '40px', height: '40px' }} class="whatsapp"><a target={"_blank"}><i style={{ fontSize: '20px', marginTop: '34px' }} class="fa fa-whatsapp fa-2x" aria-hidden="true"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='seperate' />

                                        <div className='left' style={{ flexDirection: "column" }} data-aos={"fade-down"}>
                                            <img className='logoMob' src={logo} alt='' />
                                            <h1 className='titleMob'>Medi Books</h1>
                                        </div>
                                    </div>
                            }
                        </>
                        :
                        <div className='footerContainer'>
                            <div className='right'>
                                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />

                                <div class="wrapper">
                                    <ul>
                                        <li data-aos={"fade-down"} class="facebook"><a><i class="fa fa-facebook fa-2x" aria-hidden="true"></i></a></li>
                                        <li data-aos={"fade-down"} data-aos-delay="100" class="telegram"><a><i class="fa fa-telegram fa-2x" aria-hidden="true"></i></a></li>
                                        <li data-aos={"fade-down"} data-aos-delay="200" class="instagram"><a><i class="fa fa-instagram fa-2x" aria-hidden="true"></i></a></li>
                                        <li data-aos={"fade-down"} data-aos-delay="300" class="whatsapp"><a><i class="fa fa-whatsapp fa-2x" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className='seperate' />

                            <div className='left'>
                                <h1 data-aos={"fade-down"}>Medi Books</h1>
                                <img src={logo} alt='' data-aos={"fade-in"} />
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Home;