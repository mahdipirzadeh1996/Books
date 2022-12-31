import {
    createBookFailure,
    createBookStart,
    createBookSuccess,
    deleteBookFailure,
    deleteBookStart,
    deleteBookSuccess,
    getBooksFailure,
    getBooksStart,
    getBooksSuccess,
    updateBookFailure,
    updateBookStart,
    updateBookSuccess
} from "./BookActions.js";
import axios from "axios";

//Get with mysql
export const getBooks = async (setData, state, history, dispatch) => {
    dispatch(getBooksStart());
    try {
        const res = await axios.get("/api/books");
        if (res.data === "not found") {
            alert("موردی یافت نشد!");
            dispatch(getBooksFailure());
            setData([]);
            if (state === 1) {
                history.goBack();
            }
        } else {
            setData(res.data);
            dispatch(getBooksSuccess(res.data));
        }
    } catch (err) {
        dispatch(getBooksFailure());
    }
}

//CREATE
export const createBook = async (img, book, bookSummary, bookItem, dispatch) => {
    dispatch(createBookStart());

    const data = new FormData();

    data.append("imgName", "img");
    data.append("file", img);
    data.append("file", book);
    data.append("file", bookSummary);
    data.append("bookItem", JSON.stringify(bookItem));

    await axios.post("/books", data)
        .then((res) => {
            if (res.data === "Success") {
                dispatch(createBookSuccess(res.data));
                alert("کتاب جدید با موفقیت افزوده شد!");
            } else {
                dispatch(createBookFailure());
                alert("مجددا تلاش کنید!");
            }
        }).catch((err) => {
            dispatch(createBookFailure());
            alert("خطای حساس!");
        });
}

//DELETE
export const deleteBook = async (id, img, book, bookSummary, dispatch) => {
    dispatch(deleteBookStart());
    try {
        await axios.delete("/books/" + id + "/" + img + "/" + book + "/" + bookSummary) 
            .then((res) => {
                if (res.data === "Success") {
                    dispatch(deleteBookSuccess(id));
                    alert("کتاب مورد نظر با موفقیت حذف شد!");
                } else {
                    dispatch(deleteBookFailure());
                    alert("مجددا تلاش کنید!");
                }
            });
    } catch (err) {
        dispatch(deleteBookFailure());
        alert("خطای حساس!")
    }
}

//UPDATE
export const updateBook = async (id, img, bookPDF, bookSummary, book, history, dispatch) => {
    dispatch(updateBookStart());

    const data = new FormData();

    data.append("imgName", "img");
    data.append("file", img);
    data.append("file", bookPDF);
    data.append("file", bookSummary);

    try {
        const res = await axios.put("/books/" + id + "/" + JSON.stringify(book), data);

        if (res.data === "Success") {
            dispatch(updateBookSuccess(res.data));
            alert("کتاب مورد نظر با موفقیت ویرایش شد!");
            history.goBack();
        } else {
            dispatch(updateBookFailure());
            alert("مجددا تلاش کنید!");
        }
    } catch (err) {
        dispatch(updateBookFailure());
        alert("خطای حساس!");
    }
}