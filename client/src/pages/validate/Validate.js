import React, { useEffect, useState, useContext } from 'react';
import { VpnKeyOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import axios from "axios";

import "./validate.scss";
import { validateSms } from '../../context/validContext/apiCalls';
import { ValidateContext } from "../../context/validContext/ValidateContext"

const override = css`
  display: block;
  border-color: red;
  margin-top: 5px;
`;

const Validate = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState("");
    const [counter, setCounter] = useState(120);
    const { error, isFetching, dispatch } = useContext(ValidateContext);

    const location = useLocation();
    const phone = (location.state && location.state.phone) || "";
    const history = useHistory();

    let myCounter;

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true)
        }, 1000);

        if (location.state === undefined) {
            clearTimeout(myCounter);
            history.push({pathname: "/auth", from: "validate"});
        }

        counter > 0 && timmer();
        if (counter === 0) {
            expiredCode();
            history.goBack();
        }
    });

    const expiredCode = () => {
        try {
            axios.delete(`auth/deleteSms/${phone}`);
        } catch (e) {
            console.log(e);
        }
    }

    const timmer = () => {
        myCounter = setTimeout(() => setCounter(counter - 1), 1000);
    }

    const onSubmitEnter = (e) => {
        if (e.key === 'Enter') {
            setCode(e.target.value);
            handleValidate(e);
        }
    };

    const handleValidate = (e) => {
        e.preventDefault();

        if (code.length < 6) {
            alert("کد باید 6 رقم باشد!")
        } else if (isNaN(code)) {
            alert("لطفا شماره وارد کنید!");
        } else if (!isNaN(code)) {
            validateSms(phone, code, dispatch);
            // if (!isFetching && !error) {
            //     setIsOpen(false);
            //     setTimeout(() => {
            //         history.push({pathname: "/register", from: "validate", state: {phone: phone} });
            //     }, 1000);
            // }
        }
    }

    return (
        <div className={isOpen ? "validate" : "validate validateClose"}>
            <form className={"authForm"}>
                <div className={"titleContainer"}>
                    <span>
                        کد 6 رقمی را وارد کنید
                    </span>
                    <VpnKeyOutlined className={"icon"} />
                </div>
                <input onKeyDown={onSubmitEnter} maxLength={6} type={"tel"} className={"authInput"} onChange={(e) => setCode(e.target.value)} />
                <span className={"mutedLink"}>
                    زمان باقی مانده: <span className={"boldLink"}>{counter}</span>
                </span>
                <button  className={"authButton"} onClick={handleValidate}>
                    <BeatLoader color={"#fff"} loading={isFetching} css={override} size={10} />
                    {!isFetching && "ثبت کد"}
                </button>
            </form>
        </div>
    )
}

export default Validate;