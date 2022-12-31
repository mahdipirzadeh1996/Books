import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

import "./product.css";
import emptyImg from "../../images/empty.png";
import { BookContext } from "../../context/bookContext/BookContext";
import { updateBook } from "../../context/bookContext/ApiCalls";

const override = css`
  display: block;
  border-color: red;
`;

export default function Product() {
    const [book, setBook] = useState("");
    const [cat2, setCat2] = useState(true);
    const [cat2Default, setCat2Default] = useState("DEFAULT");
    const [img, setImg] = useState(null);
    const [bookPDF, setBookPDF] = useState(null);
    const [bookSummary, setBookSummary] = useState(null);

    const history = useHistory();
    const location = useLocation();
    const bookUrl = location.book;

    const { isFetching, dispatch } = useContext(BookContext);

    useEffect(() => {
        if (bookUrl === undefined) {
            history.goBack();
        } else {
            setBook(bookUrl);

            if (bookUrl.cat1 === "پیراپزشکی") {
                setCat2(false);
                setCat2Default(bookUrl.cat2);
            } else if (bookUrl.cat !== "پیراپزشکی") {
                setCat2(true);
                setCat2Default("DEFAULT");
            }
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        if (value === "پیراپزشکی") {
            setCat2(false);
        } else if (e.target.name === "cat1" && value !== "پیراپزشکی") {
            delete book.cat2;
            setCat2(true);
        }
        setBook({ ...book, [e.target.name]: value });
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        updateBook(book.id, img, bookPDF, bookSummary, book, history, dispatch);
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">ویرایش کتاب</h1>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">id:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.id}</span>
                            </div>
                        </div>
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">نام کتاب:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.name}</span>
                            </div>
                        </div>
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">قیمت:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.price}</span>
                            </div>
                        </div>
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">نویسنده:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.writer}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="productTopRight">
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">کلاسبندی اول:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.cat1}</span>
                            </div>
                        </div>
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">کلاسبندی دوم:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.cat2}</span>
                            </div>
                        </div>
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">کتاب یا جزوه:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.isBook === 1 ? "کتاب" : "جزوه"}</span>
                            </div>
                        </div>
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">سال انتشار:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.year}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="productTopRight">
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">تعداد صفحات:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.pages}</span>
                            </div>
                        </div>
                        <div className="productInfoItem">
                            <div className="productInfoKeyContainer">
                                <span className="productInfoKey">منتشر شده:</span>
                            </div>
                            <div className="productInfoValueContainer">
                                <span className="productInfoValue">{book.isPublish === 1 ? "بله" : "خیر"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productTopRight">
                <div className="productInfoBottom">
                    <div className="productDescItem">
                        <div className="productDescKeyContainer">
                            <span className="productInfoKey">توضیحات:</span>
                        </div>
                        <div className="productDescValueContainer">
                            <span className="productDescValue">{book.explaine}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>نام کتاب</label>
                        <input type="text" placeholder={book.name} name={"name"} onChange={handleChange} />
                        <label>قیمت</label>
                        <input type="text" placeholder={book.price} name={"price"} onChange={handleChange} />
                        <label>نویسنده</label>
                        <input type="text" placeholder={book.writer} name={"writer"} onChange={handleChange} />
                        <label>سال انتشار</label>
                        <input type="text" placeholder={book.year} name={"year"} onChange={handleChange} />
                        <label>صفحات</label>
                        <input type="text" placeholder={book.pages} name={"pages"} onChange={handleChange} />
                        <label>توضیحات</label>
                        <input type="text" placeholder={book.explaine} name={"explaine"} onChange={handleChange} />

                        <label>کلاسبندی</label>
                        <select defaultValue={book.cat1} name="cat1" id="cat1" onChange={handleChange}>
                            <option value={"DEFAULT"} disabled>کلاسبندی اول</option>
                            <option value={"پزشکی"}>پزشکی</option>
                            <option value={"پرستاری"}>پرستاری</option>
                            <option value={"علوم آزمایشگاهی"}>علوم آزمایشگاهی</option>
                            <option value={"پیراپزشکی"}>پیراپزشکی</option>
                        </select>

                        <label>کلاسبندی</label>
                        <select disabled={cat2} defaultValue={cat2Default} name="cat2" id="cat2" onChange={handleChange}>
                            <option value={"DEFAULT"} disabled>کلاسبندی دوم</option>
                            <option value={"پزشکی"}>پزشکی</option>
                            <option value={"پرستاری"}>پرستاری</option>
                            <option value={"علوم آزمایشگاهی"}>علوم آزمایشگاهی</option>
                            <option value={"پیراپزشکی"}>پیراپزشکی</option>
                        </select>

                        <label>آیا کتاب است؟</label>
                        <select defaultValue={"DEFAULT"} name="isBook" id="isBook">
                            <option value={"DEFAULT"} disabled>یله یا خیر</option>
                            <option value={0}>خیر</option>
                            <option value={1}>بله</option>
                        </select>

                        <label>آیا منتشر شود؟</label>
                        <select defaultValue={"DEFAULT"} name="isBook" id="isBook">
                            <option value={"DEFAULT"} disabled>یله یا خیر</option>
                            <option value={0}>خیر</option>
                            <option value={1}>بله</option>
                        </select>

                        <label>تصویر جلد کتاب</label>
                        <input
                            type="file"
                            id="img"
                            name={"img"}
                            accept={"image/x-png,image/gif,image/jpeg,image/jpg"}
                            onChange={(e) => setImg(e.target.files[0])}
                        />

                        <label>فایل کتاب</label>
                        <input
                            type="file"
                            id="book"
                            name={"book"}
                            accept={"application/pdf"}
                            onChange={(e) => setBookPDF(e.target.files[0])}
                        />

                        <label>فایل خلاصه کتاب</label>
                        <input
                            type="file"
                            id="bookSummary"
                            name={"bookSummary"}
                            accept={"application/pdf"}
                            onChange={(e) => setBookSummary(e.target.files[0])}
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={img ? URL.createObjectURL(img) : emptyImg}
                                alt="" className="productUploadImg" />
                            <img
                                src={window.$url + book.img}
                                alt="" className="productUploadImg" />
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button disabled={isFetching} className="productButton" onClick={handleUpdate}>
                            <BeatLoader color={"#fff"} loading={isFetching} css={override} size={10} />
                            {!isFetching && "اعمال تغییرات"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}