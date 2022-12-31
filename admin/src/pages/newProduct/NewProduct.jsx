import { useContext, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

import "./newProduct.css";
import { createBook } from "../../context/bookContext/ApiCalls";
import { BookContext } from "../../context/bookContext/BookContext";
import Operation from "../../components/operation/Operation";

const override = css`
  display: block;
  border-color: red;
`;

export default function NewProduct() {
    const [bookItem, setBookItem] = useState(null);
    const [img, setImg] = useState(null);
    const [book, setBook] = useState(null);
    const [bookSummary, setBookSummary] = useState(null);
    const [cat2, setCat2] = useState(true);

    const { isFetching, dispatch } = useContext(BookContext);

    const handleChange = (e) => {
        const value = e.target.value;

        if (value === "پیراپزشکی") {
            setCat2(false);
        } else if (e.target.name === "cat1" && value !== "پیراپزشکی") {
            delete bookItem.cat2;
            setCat2(true);
        }
        setBookItem({ ...bookItem, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (img === null || book === null || bookSummary === null) {
            alert("عکس ها یا فایل ها را انتخاب نکرده اید!");
        } else {
            if (bookItem !== null) {
                if (bookItem.cat1 !== "پیراپزشکی") {
                    if (bookItem.name === undefined || bookItem.explaine === undefined || bookItem.year === undefined || bookItem.pages === undefined || bookItem.price === undefined || bookItem.writer === undefined || bookItem.isBook === undefined || bookItem.isPublish === undefined || bookItem.cat1 === undefined) {
                        alert("موردی را تکمیل نکرده اید!");
                    } else {
                        createBook(img, book, bookSummary, bookItem, dispatch);
                    }
                } else if (bookItem.cat1 === "پیراپزشکی") {
                    if (bookItem.name === undefined || bookItem.explaine === undefined || bookItem.year === undefined || bookItem.pages === undefined || bookItem.price === undefined || bookItem.writer === undefined || bookItem.isBook === undefined || bookItem.isPublish === undefined || bookItem.cat1 === undefined || bookItem.cat2 === undefined) {
                        alert("موردی را تکمیل نکرده اید!");
                    } else {
                        createBook(img, book, bookSummary, bookItem, dispatch);
                    }
                }
            } else {
                alert("لطفا موارد را تکمیل کنید!");
            }
        }
    }

    return (
        <div disabled={true} className="newProduct">
            <h1 className="addProductTitle">کتاب جدید</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>تصویر</label>
                    <input
                        type="file"
                        id="img"
                        name={"img"}
                        accept={"image/x-png,image/gif,image/jpeg,image/jpg"}
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>کتاب</label>
                    <input
                        type="file"
                        id="book"
                        name={"book"}
                        accept={"application/pdf"}
                        onChange={(e) => setBook(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>خلاصه کتاب</label>
                    <input
                        type="file"
                        id="bookSummary"
                        name={"bookSummary"}
                        accept={"application/pdf"}
                        onChange={(e) => setBookSummary(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>عنوان</label>
                    <input type="text" maxLength={100} placeholder="نام کتاب" name={"name"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>توضیحات</label>
                    <input type="text" placeholder="توضیحات کتاب" name={"explaine"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>سال</label>
                    <input type="text" placeholder="سال انتشار کتاب" name={"year"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>صفحات</label>
                    <input type="text" placeholder="تعداد صفحات" name={"pages"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>قیمت</label>
                    <input type="text" placeholder="قیمت کتاب" name={"price"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>نویسنده</label>
                    <input type="text" placeholder="نویستده کتاب" name={"writer"} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>آیا کتاب است؟</label>
                    <select defaultValue={"DEFAULT"} name="isBook" id="isBook" onChange={handleChange}>
                        <option value={"DEFAULT"} disabled>یله یا خیر</option>
                        <option value={0}>خیر</option>
                        <option value={1}>بله</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>آیا منتشر شود؟</label>
                    <select defaultValue={"DEFAULT"} name="isPublish" id="isPublish" onChange={handleChange}>
                        <option value={"DEFAULT"} disabled>یله یا خیر</option>
                        <option value={0}>خیر</option>
                        <option value={1}>بله</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>کلاسبندی</label>
                    <select defaultValue={"DEFAULT"} name="cat1" id="cat1" onChange={handleChange}>
                        <option value={"DEFAULT"} disabled>کلاسبندی اول</option>
                        <option value={"پزشکی"}>پزشکی</option>
                        <option value={"پرستاری"}>پرستاری</option>
                        <option value={"علوم آزمایشگاهی"}>علوم آزمایشگاهی</option>
                        <option value={"پیراپزشکی"}>پیراپزشکی</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>کلاسبندی</label>
                    <select disabled={cat2} defaultValue={"DEFAULT"} name="cat2" id="cat2" onChange={handleChange}>
                        <option value={"DEFAULT"} disabled>کلاسبندی دوم</option>
                        <option value={"پزشکی"}>پزشکی</option>
                        <option value={"پرستاری"}>پرستاری</option>
                        <option value={"علوم آزمایشگاهی"}>علوم آزمایشگاهی</option>
                        <option value={"پیراپزشکی"}>پیراپزشکی</option>
                    </select>
                </div>
                <button className="addProductButton" onClick={handleSubmit}>
                    <BeatLoader color={"#fff"} loading={isFetching} css={override} size={10} />
                    {!isFetching && "ثبت اطلاعات"}
                </button>
            </form>
        </div>
    );
}