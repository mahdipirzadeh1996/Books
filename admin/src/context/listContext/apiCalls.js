import {
    createListFailure, createListStart, createListSuccess,
    deleteListFailure, deleteListStart, deleteListSuccess,
    getListsFailure, getListsStart, getListsSuccess,
    updateListFailure, updateListStart, updateListSuccess
} from "./ListActions.js";
import axios from "axios";

//Get with mysql
export const getLists = async (setData, dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get("/api/lists");
        if (res.data === "not found") {
            alert("موردی یافت نشد!");
            dispatch(getListsFailure());
            setData([]);
        } else {
            setData(res.data);
            dispatch(getListsSuccess(res.data));
        }
    } catch (err) {
        dispatch(getListsFailure());
    }
}

//CREATE
export const createList = async (listItem, content, dispatch) => {
    dispatch(createListStart());

    await axios.post("/lists", { listItem, content })
        .then((res) => {
            if (res.data === "Success") {
                dispatch(createListSuccess(res.data));
                alert("لیست جدید با موفقیت ثبت شد!");
            } else {
                dispatch(createListFailure());
                alert("مجددا تلاش کنید!");
            }
        }).catch((err) => {
            dispatch(createListFailure());
            alert("خطای حساس!");
        });
}

//DELETE
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/lists/" + id)
            .then((res) => {
                if (res.data === "Success") {
                    dispatch(deleteListSuccess(id));
                    alert("لیست مورد نظر با موفقیت حذف شد!");
                } else {
                    dispatch(deleteListFailure());
                    alert("مجددا تلاش کنید!");
                }
            });
    } catch (err) {
        dispatch(deleteListFailure());
        alert("خطای حساس!")
    }
}

//UPDATE
export const updateList = async (listItem, history, dispatch) => {
    dispatch(updateListStart());

    try {
        const res = await axios.put("/lists", { listItem });

        if (res.data === "Success") {
            dispatch(updateListSuccess(res.data));
            alert("لیست مورد نظر با موفقیت ویرایش شد!");
            history.goBack();
        } else {
            dispatch(updateListFailure());
            alert("مجددا تلاش کنید!");
        }
    } catch (err) {
        dispatch(updateListFailure());
        alert("خطای حساس!");
    }
}