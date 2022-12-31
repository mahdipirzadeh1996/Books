import React, { useState, useContext, useEffect } from 'react';
import { PhoneEnabled } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

import "./auth.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import { sendSms } from '../../context/authContext/apiCalls';

const override = css`
  display: block;
  border-color: red;
  margin-top: 5px;
`;

const Auth = () => {
    const [phone, setPhone] = useState("");
    const [phonee, setPhonee] = useState(false);
    const { error, isFetching, dispatch } = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            setPhonee(true)
        }, 1000)
    }, []);

    const handleAuth = (e) => {
        e.preventDefault();

        if (phone.length < 11) {
            alert("شماره باید 11 رقم باشد!")
        } else if (isNaN(phone)) {
            alert("لطفا شماره وارد کنید!");
        } else if (!isNaN(phone)) {
            sendSms(phone, dispatch);
            // if (!isFetching && !error) {
            //     setPhonee(false);
            //     setTimeout(() => {
            //         history.push({pathname: "/validate", from: "auth", state: {phone: phone} });
            //     }, 1000);
            // }
        }
    };

    const onSubmitEnter = (e) => {
        if (e.key === 'Enter') {
            setPhone(e.target.value);
            handleAuth(e);
        }
    };

    return (
        <div className={phonee ? "auth" : "auth authClose"}>
            <form className={"authForm"}>
                <div className={"titleContainer"}>
                    <span>
                        شماره موبایل خود را وارد کنید
                    </span>
                    <PhoneEnabled className={"icon"} />
                </div>
                <input onKeyDown={onSubmitEnter} maxLength={11} type={"tel"} placeholder={"مثال: 09121234567"} className={"authInput"} onChange={(e) => setPhone(e.target.value)} />
                <button disabled={isFetching} className={"authButton"} onClick={handleAuth}>
                    <BeatLoader color={"#fff"} loading={isFetching} css={override} size={10} />
                    {!isFetching && "ارسال کد"}
                </button>
            </form>
        </div>
    )
}

export default Auth;