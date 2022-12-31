import axios from "axios";

import { validateFailure, validateStart, validateSuccess, logout } from "./ValidateActions";

const CryptoJs = require("crypto-js");

export const validateSms = async (phone, code, dispatch) => {
    dispatch(validateStart());

    const validateCode = () => {
        axios.post('/api/auth/validation', { phone, code }).then((res) => {
            let decryptValidateSms = CryptoJs.AES.decrypt(res.data.success, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

            if (decryptValidateSms === "success") {
                insertUser();
            } else if (decryptValidateSms === "failed") {
                dispatch(validateFailure());
                alert("مجددا تلاش کنید!");
            }
        });
    }

    const insertUser = () => {
        axios.post("/api/auth/insertUser", { phone }).then((res) => {
            let decryptValidateSms = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);
            console.log(decryptValidateSms);
            if (decryptValidateSms === "userExist") {
                dispatch(validateFailure());
                alert("این شماره قبلا ثبت شده است!");
            } else if (decryptValidateSms === "Register") {
                //getUser();
            }
        });
    }

    const getUser = () => {
        axios.post("/api/auth/getUser", { phone }).then((res) => {
            dispatch(validateSuccess(res.data));
        });
    }

    try {
        validateCode();
    } catch (err) {
        dispatch(validateFailure());
        alert("مجددا تلاش کنید!");
    }
}

export const logoutSuccess = async (dispatch) => {
    dispatch(logout());
}