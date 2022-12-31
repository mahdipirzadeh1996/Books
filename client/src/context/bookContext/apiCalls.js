import axios from "axios";

import { bookFailure, bookStart, bookSuccess } from "./BookActions";

const CryptoJs = require("crypto-js");

export const getBook = async (name, dispatchh) => {
    dispatchh(bookStart());
    try {
        const res = await axios.get(`/api/books/obj/${name}`);
        let decryptInsertJwt = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

        if (decryptInsertJwt === "wrongToken") {
            dispatchh(bookFailure());
            localStorage.removeItem("phone");
        } else {
            dispatchh(bookSuccess(res.data));
        }
    } catch (err) {
        dispatchh(bookFailure());
    }
}

export const getPdf = async (setD, name) => {
    //const res = await axios.get('http://localhost:8800/pdfs');
    axios(`https://medibooks.ir/api/pdfs/${name}`, {
        method: "GET",
        responseType: "blob"
        //Force to receive data in a Blob Format
    })
        .then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob([response.data], {
                type: "application/pdf"
            });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            //window.open(fileURL);
            //console.log(response.data)
            setD(fileURL)
        })
        .catch(error => {
            console.log(error);
        });
    //console.log(res.data)
};

export const getRand = async (dispatchh) => {
    dispatchh(bookStart());
    try {
        // const user = JSON.parse(localStorage.getItem("phone"));
        // const accessToken = user.accessToken;

        const res = await axios.get(`/api/books/random`);
        let decryptInsertJwt = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

        if (decryptInsertJwt === "wrongToken") {
            dispatchh(bookFailure());
            localStorage.removeItem("phone");
        } else {
            dispatchh(bookSuccess(res.data));
        }
    } catch (err) {
        dispatchh(bookFailure());
    }
}