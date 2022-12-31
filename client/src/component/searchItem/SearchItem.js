import React, { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import ReactCardFlip from 'react-card-flip';

import "./searchItem.scss";

const SearchItem = ({ item, i, goto }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleInputChange = useCallback((event, i) => {
        event.preventDefault();
        goto(true, item)
    }, [goto, item]);

    function handleFlip(e) {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div
                className={"itemContainer"}
                onClick={handleFlip}
            >
                <img src={process.env.REACT_APP_DOMAIN + item.img} alt={""} />
            </div>

            <div
                className={"itemContainer"}
                onClick={handleFlip}
            >
                <div className={"infoContainer"}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className={"title"}>
                            {item.name}
                        </span>
                        <span className={"year"}>
                            ({item.year})
                        </span>
                    </div>
                    <div className={"raitingContainer"}>
                        <span className={"imdb"}>نویسنده:</span>
                        <span className={"dir"}>
                            {item.writer}
                        </span>
                    </div>
                    <div className={"raitingContainer"}>
                        <span className={"imdb"}>{item.cat1}</span>
                        {(item.cat2 !== null && item.cat2 !== "null") &&
                            <>
                                <span className={"imdb"}>،</span>
                                <span className={"imdb"}>{item.cat2}</span>
                            </>
                        }
                        {/* <span className={"dir"}>
                                {item.writer}
                            </span> */}
                    </div>
                    <div className={"moreBtn"} onClick={() => window.open(`/book/${item.name}`, "_blank")}>
                        صفحه خرید
                    </div>
                </div>
            </div>
        </ReactCardFlip>
    )
}

export default SearchItem;