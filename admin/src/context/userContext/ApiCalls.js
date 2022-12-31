import axios from "axios";

import {
    getUsersFailure, getUsersStart, getUsersSuccess,
    updateUserFailure, updateUserStart, updateUserSuccess
} from "./UserActions";

//GET
export const getUsers = async (setData, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("/api/users");

        if (res.data === "not found") {
            alert("موردی یافت نشد!");
            dispatch(getUsersFailure());
            setData([]);
        } else {
            setData(res.data);
            dispatch(getUsersSuccess(res.data));
        }
    } catch (err) {
        dispatch(getUsersFailure());
    }
}

//UPDATE
export const updateUser = async (phone, status, setData, dispatch) => {
    dispatch(updateUserStart());

    try {
        const res = await axios.put("/users/" + phone + "/" + status);

        if (res.data === "Success") {
            dispatch(updateUserSuccess(res.data));
            getUsers(setData, dispatch);
            alert("کاربر با موفقیت ویرایش شد!");
        } else {
            dispatch(updateUserFailure());
            alert("مجددا تلاش کنید!");
        }
    } catch (err) {
        dispatch(updateUserFailure());
        alert("خطای حساس!");
    }
}