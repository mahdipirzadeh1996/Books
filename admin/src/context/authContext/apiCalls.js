import axios from "axios";

import { authFailure, authStart, authSuccess } from "./AuthActions";

const CryptoJs = require("crypto-js");

export const sendSms = async (phone, dispatch) => {
    dispatch(authStart());

    try {
        axios.delete(`/api/auth/deleteSms/${phone}`).then((res, err) => {
            let decryptDeleteSms = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

            console.log(decryptDeleteSms); 
            if (decryptDeleteSms === "successDelete") {
                axios.post("/api/auth/sendSms", { phone }).then((res, err) => {
                    let decryptInsertSms = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

                    if (decryptInsertSms === "successInsert") {
                        dispatch(authSuccess(phone));
                    } else {
                        dispatch(authFailure());
                        alert("مجددا تلاش کنید!");
                    }
                });
            } else {
                dispatch(authFailure());
                alert("مجددا تلاش کنید!");
            }
        });
    } catch (err) {
        dispatch(authFailure());
    }
}

export const testUser = async (dispatch) => {
    //dispatch(authStart());
    try {
        const user = JSON.parse(localStorage.getItem("phone"));
        const accessToken = user.accessToken;

        const res = await axios.get(`/api/testuser/${JSON.stringify(user.result[0])}`, {
            headers: {
                token: "Bearer " + accessToken
            }
        });
        let decryptInsertJwt = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

        if (decryptInsertJwt === "wrongToken") {
            dispatch(authFailure());
            localStorage.removeItem("phone");
        } else {
            dispatch(authSuccess(res.data));
            //localStorage.setItem("users", JSON.stringify(res.data));
        }
    } catch (err) {
        dispatch(authFailure());
    }
}

export const insertUser = async (user, phone, dispatch) => {
    dispatch(authStart());

    try {
        const res = await axios.put("/users/" + phone, user);

        if (res.data === "Success") {
            dispatch(authSuccess(res.data));
            alert("اطلاعات شما با موفقیت ثبت شد");
        } else {
            dispatch(authFailure());
            alert("مجددا تلاش کنید!");
        }
    } catch (err) {
        dispatch(authFailure());
        alert("خطای حساس!");
    }
}