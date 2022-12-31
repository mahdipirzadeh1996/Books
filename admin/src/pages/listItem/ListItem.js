import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import "./listItem.scss";
import { ListContext } from "../../context/listContext/ListContext";
import { getBooks } from '../../context/bookContext/ApiCalls';
import { updateList } from '../../context/listContext/apiCalls';

const override = css`
  display: block;
  border-color: red;
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ListItem = () => {
    const [data, setData] = useState([]);
    const [content, setcontent] = useState([]);
    const [list, setList] = useState([]);
    const [isBook, setIsBook] = useState('');

    const location = useLocation();
    const history = useHistory();

    const listL = location.list;

    const { isFetching, dispatch } = useContext(ListContext);

    useEffect(() => {
        getBooks(setData, 1, history, dispatch).then(r => r);
        if (listL === undefined) {
            history.goBack();
        } else {
            setList(listL);
            setcontent(JSON.parse(listL.content));
            setIsBook(listL.isBook);
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        if (e.target.name === "isBook") {
            setIsBook(value);
        } else if (e.target.name === "content") {
            setcontent(value);
        }

        setList({ ...list, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (listItem !== null) {
        //     if (listItem.title === undefined || listItem.isBook === undefined || content.length === 0) {
        //         alert("موردی را تکمیل نکرده اید!");
        //     } else {
        //         if (content.length > 10) {
        //             alert("شما تنها 10 مورد را می توانید برای لیست انتخاب کنید!");
        //         } else {
        //             //createList(listItem, content, dispatch);
        //         }
        //     }
        // } else {
        //     alert("لطفا موارد را تکمیل کنید!");
        // }

        if (content.length === 0) {
            alert("محتوا را انتخاب کنید!")
        } else if (content.length > 10) {
            alert("شما تنها 10 مورد را می توانید برای لیست انتخاب کنید!");
        } else {
            updateList(list, history, dispatch)
        }
    }

    return (
        <div className='listItem'>
            <h1 className="listTitle">لیست جدید</h1>
            <form className="listForm">
                <div className="updateListItem">
                    <label>عنوان</label>
                    <input
                        type="text"
                        maxLength={100}
                        placeholder={list.title}
                        name={"title"}
                        onChange={handleChange}
                    />
                </div>
                <div className="updateListItem">
                    <label>لیست جزوه یا کتاب</label>
                    {/* <select defaultValue={undefined} name="isBook" onChange={handleChange}>
                        <option value={"DEFAULT"} disabled>جزوه یا کتاب</option>
                        <option value={0}>جزوه</option>
                        <option value={1}>کتاب</option>
                    </select> */}
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel style={{ fontFamily: "yekan" }}>لیست جزوه یا کتاب</InputLabel>
                        <Select
                            value={isBook}
                            label="Age"
                            name="isBook"
                            input={<OutlinedInput label="لیست جزوه یا کتاب" />}
                            onChange={handleChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    <Chip label={selected === 0 ? "جزوه" : "کتاب"} />
                                </Box>
                            )}
                        >
                            <MenuItem style={{ direction: "rtl", fontFamily: "yekan" }} value={0}>جزوه</MenuItem>
                            <MenuItem style={{ direction: "rtl", fontFamily: "yekan" }} value={1}>کتاب</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="updateListItem">
                    <label>کتاب ها</label>
                    <FormControl sx={{ width: 250 }}>
                        <InputLabel style={{ fontFamily: "yekan" }}>عنوان کتاب ها</InputLabel>
                        <Select
                            multiple
                            value={content}
                            name={"content"}
                            onChange={handleChange}
                            input={<OutlinedInput label="عنوان کتاب ها" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {data.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    value={item.name}
                                    style={{ direction: "rtl", fontFamily: "yekan" }}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <button disabled={isFetching} className="addListButton" onClick={(handleSubmit)}>
                    <BeatLoader color={"#fff"} loading={isFetching} css={override} size={10} />
                    {!isFetching && "اعمال ویرایش"}
                </button>
            </form>
        </div >
    )
}

export default ListItem;