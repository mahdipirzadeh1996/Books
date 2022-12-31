import React, { useState, useContext, useEffect } from 'react';
import { PhoneEnabled } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

import "./register.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import { insertUser } from "../../context/authContext/apiCalls";

const override = css`
  display: block;
  border-color: red;
  margin-top: 5px;
`;

const Register = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [varifyPass, setVarifyPass] = useState(null);
    const { error, isFetching, dispatch } = useContext(AuthContext);

    const history = useHistory();
    const location = useLocation();
    const phone = (location.state && location.state.phone) || "";

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });

    useEffect(() => {
        if (phone === "") {
            history.goBack();
        }
        
        setTimeout(() => {
            setIsOpen(true)
        }, 1000);
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        const value = e.target.value;

        setUser({ ...user, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user !== null) {
            if (user.name === (undefined || "") || user.family === (undefined || "") || user.password === (undefined || "")) {
                alert("موردی را تکمیل نکرده اید!");
            } else {
                if (user.password !== varifyPass) {
                    alert("کلمه های عبور یکسان نیستند");
                } else {
                    insertUser(user, phone, dispatch);
                    if (!isFetching && !error) {
                        setIsOpen(false);
                        setTimeout(() => {
                            history.push({ pathname: "/", from: "register" });
                        }, 1000);
                    }
                }
            }
        } else {
            alert("لطفا موارد را تکمیل کنید!");
        }
    }

    return (
        <div className={isOpen ? "register" : "register registerClose"}>
            <form className={"authForm"}>
                <div className={"titleContainer"}>
                    <h1>
                        اطلاعات فردی
                    </h1>
                </div>
                <input
                    maxLength={200}
                    type={"text"}
                    placeholder={"نام"}
                    className={"authInput"}
                    name={"name"}
                    onChange={handleChange} />
                <input
                    maxLength={200}
                    type={"text"}
                    placeholder={"نام خانوادگی"}
                    className={"authInput"}
                    name={"family"}
                    onChange={handleChange} />
                <div className='passContainer'>
                    <input
                        maxLength={200}
                        type={values.showPassword ? "text" : "password"}
                        placeholder={"کلمه عبور"}
                        className={"passInput"}
                        name={"password"}
                        onChange={handleChange} />
                    <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </div>
                <div className='passContainer'>
                    <input
                        maxLength={200}
                        type={values.showPassword ? "text" : "password"}
                        placeholder={"تکرار کلمه عبور"} className={"passInput"}
                        onChange={(e) => setVarifyPass(e.target.value)} />
                </div>

                <button disabled={isFetching} className={"authButton"} onClick={handleSubmit}>
                    <BeatLoader color={"#fff"} loading={isFetching} css={override} size={10} />
                    {!isFetching && "ثبت"}
                </button>
            </form>

            {/* <div
                style={{
                    marginLeft: "30%",
                    backgroundColor: "white",
                }}
            >
                <h4>How to show and hide password in ReactJS?</h4>
                <InputLabel htmlFor="standard-adornment-password">
                    Enter your Password
                </InputLabel>
                <Input
                    type={values.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange("password")}
                    value={values.password}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </div> */}
        </div >
    );
};

export default Register;