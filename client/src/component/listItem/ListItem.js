import { useEffect, useState, useRef, useContext } from "react";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

import "./listItem.scss";
import { getListItem } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";

const override = css`
  display: block;
`;

const ListItem = ({ item }) => {
    const [hovered, setHovered] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const { listDispatch } = useContext(ListContext);

    useEffect(() => {
        const getMovie = async () => {
            try {
                getListItem(item, setListItem, listDispatch);
            } catch (err) {
                console.log(err);
            }
        };

        getMovie();
    }, [item]);

    return (
        <>
            <div style={{ display: loading ? "block" : "none", backgroundColor: "red" }}>

            </div>
            <div
                className={"listItem"}
                onMouseEnter={() => {
                    setHovered(true);
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
            >
                {
                    listItem.length > 0 &&
                        <Link className="link" to={`/book/${listItem[0].name}`} target={"_blank"}>
                            <div className={!hovered ? "infoContainer" : "infoContainer hover"}>
                                {listItem[0].name}
                            </div>
                            <img style={{display: !loading ? "block" : "none"}} src={process.env.REACT_APP_DOMAIN + listItem[0].img} alt="" onLoad={() => setLoading(false)} />
                            <div className={loading ? "loaderContainer" : "loaderContainer hide"}>
                                <DotLoader color={"#34b7f1"} loading={loading} css={override} size={60} />
                            </div>
                        </Link>
                }
            </div>
        </>
    )
}

export default ListItem;