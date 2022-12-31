import axios from "axios";

import { listFailure, listStart, listSuccess } from "./ListActions";

const CryptoJs = require("crypto-js");

export const getLists = async (setList, dispatch) => {
    dispatch(listStart());
    try {
        const res = await axios.get('/api/lists');
        let decryptInsertJwt = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

        if (decryptInsertJwt === "wrongToken") {
            dispatch(listFailure());
            localStorage.removeItem("phone");
        } else {
            setList(res.data);
            dispatch(listSuccess(res.data));
        }
    } catch (err) {
        dispatch(listFailure());
    }
}

export const getListItem = async (content, setListItem, dispatch) => {
    dispatch(listStart());
    try {
        const res = await axios.get(`/api/lists/getlistitem/${content}`);
        let decryptInsertJwt = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

        if (decryptInsertJwt === "wrongToken") {
            dispatch(listFailure());
            localStorage.removeItem("phone");
        } else {
            res.data !== "not found" && setListItem(res.data);
            dispatch(listSuccess(res.data));
        }
    } catch (err) {
        dispatch(listFailure());
    }
}