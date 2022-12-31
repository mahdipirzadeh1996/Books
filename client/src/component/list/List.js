import React, { useEffect, useRef, useState } from "react";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";
import AOS from 'aos';
import 'aos/dist/aos.css';

import "./list.scss";
import ListItem from "../listItem/ListItem";

const List = ({ type, list }) => {
    const listRef = useRef();

    const [slideNumber, setSlideNumber] = useState(0);
    const [isMoved, setIsMoved] = useState(false);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, [])

    const handleClick = (direction) => {
        setIsMoved(true);
        let temp;

        if (direction === "left" && slideNumber !== -9) {
            setSlideNumber(slideNumber - 1);
            temp = 230 + distance;
            setDistance(230 + distance);
            listRef.current.style.transform = `translateX(${temp}px)`
        } else if (direction === "right" && slideNumber !== 0) {
            setSlideNumber(slideNumber + 1);
            temp = -230 + distance;
            setDistance(-230 + distance);
            listRef.current.style.transform = `translateX(${temp}px)`
        }
    }

    if (type === "books") {
        return (
            list.isBook === 1 &&
            <div data-aos={"fade-up"} className={"list"}>
                <div className="titleContainer">
                    <h1 className={"type"}>{list.isBook === 0 ? "جزوات" : "کتاب های"}:</h1>
                    <h1 className={"listTitle"}>{list.title}</h1>
                </div>
                <div className={"wrapperContainer"}>
                    <ArrowBackIosOutlined
                        className={"sliderArrow left"}
                        onClick={() => handleClick("left")}
                    />
                    <div className={"wrapperr"}>
                        <div className={"container"} ref={listRef}>
                            {JSON.parse(list.content).map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))}
                        </div>
                    </div>
                    <ArrowForwardIosOutlined
                        className={"sliderArrow right"}
                        onClick={() => handleClick("right")}
                        style={{ display: !isMoved && "none" }}
                    />
                </div>
            </div>
        )
    } else if (type === "articles") {
        return (
            list.isBook === 0 &&
            <div data-aos={"fade-up"} className={"list"}>
                <div className="titleContainer">
                    <h1 className={"type"}>{list.isBook === 0 ? "جزوات" : "کتاب های"}:</h1>
                    <h1 className={"listTitle"}>{list.title}</h1>
                </div>
                <div className={"wrapperContainer"}>
                    <ArrowBackIosOutlined
                        className={"sliderArrow left"}
                        onClick={() => handleClick("left")}
                    />
                    <div className={"wrapperr"}>
                        <div className={"container"} ref={listRef}>
                            {JSON.parse(list.content).map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))}
                        </div>
                    </div>
                    <ArrowForwardIosOutlined
                        className={"sliderArrow right"}
                        onClick={() => handleClick("right")}
                        style={{ display: !isMoved && "none" }}
                    />
                </div>
            </div>
        )
    } else if (type === undefined) {
        return (
            <div data-aos={"fade-up"} className={"list"}>
                <div className="titleContainer">
                    <h1 className={"type"}>{list.isBook === 0 ? "جزوات" : "کتاب های"}:</h1>
                    <h1 className={"listTitle"}>{list.title}</h1>
                </div>
                <div className={"wrapperContainer"}>
                    <ArrowBackIosOutlined
                        className={"sliderArrow left"}
                        onClick={() => handleClick("left")}
                    />
                    <div className={"wrapperr"}>
                        <div className={"container"} ref={listRef}>
                            {JSON.parse(list.content).map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))}
                        </div>
                    </div>
                    <ArrowForwardIosOutlined
                        className={"sliderArrow right"}
                        onClick={() => handleClick("right")}
                        style={{ display: !isMoved && "none" }}
                    />
                </div>
            </div>
        )
    }
}

export default List;