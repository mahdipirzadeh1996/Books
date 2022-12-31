import axios from "axios";

import { statusFailure, statusStart, statusSuccess } from "./StatusActions";

const CryptoJs = require("crypto-js");

export const checkStatus = async (dispatch) => {
    dispatch(statusStart());
    try {
        const user = JSON.parse(localStorage.getItem("phone"));
        const phone = user.result[0].phone;
        const accessToken = user.accessToken;

        const res = await axios.get(`/api/checkstatus/${phone}`, {
            headers: {
                token: "Bearer " + accessToken
            }
        });
        let decryptInsertJwt = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

        if (decryptInsertJwt === "wrongToken") {
            dispatch(statusFailure());
            localStorage.removeItem("phone");
        } else {
            dispatch(statusSuccess(res.data[0].status));
            //localStorage.setItem("users", JSON.stringify(res.data));
        }
    } catch (err) {
        dispatch(statusFailure());
    }
}