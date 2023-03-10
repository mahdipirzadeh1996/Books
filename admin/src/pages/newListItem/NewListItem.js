import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import "./newListItem.scss";
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { getBooks } from '../../context/bookContext/ApiCalls';

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

const NewListItem = () => {
    const [listItem, setListItem] = useState(null);
    const [data, setData] = useState([]);
    const [content, setcontent] = useState([]);

    const history = useHistory();

    const { isFetching, dispatch } = useContext(ListContext);

    useEffect(() => {
        getBooks(setData, 1, history, dispatch).then(r => r);
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        setListItem({ ...listItem, [e.target.name]: value });
    }

    const handleSelectChange = (event) => {
        const {
            target: { value },
        } = event;
        setcontent(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (listItem !== null) {
            if (listItem.title === undefined || listItem.isBook === undefined || content.length === 0) {
                alert("?????????? ???? ?????????? ?????????? ??????!");
            } else {
                if (content.length > 10) {
                    alert("?????? ???????? 10 ???????? ???? ???? ???????????? ???????? ???????? ???????????? ????????!");
                } else {
                    createList(listItem, content, dispatch);
                }
            }
        } else {
            alert("???????? ?????????? ???? ?????????? ????????!");
        }
    }

    return (
        <div className='newListItem'>
            <h1 className="addListTitle">???????? ????????</h1>
            <form className="addListForm">
                <div className="addListItem">
                    <label>??????????</label>
                    <input
                        type="text"
                        maxLength={100}
                        placeholder="?????????? ????????"
                        name={"title"}
                        onChange={handleChange}
                    />
                </div>
                <div className="addListItem">
                    <label>?????? ???????? ???????? ????????</label>
                    <select defaultValue={"DEFAULT"} name="isBook" onChange={handleChange}>
                        <option value={"DEFAULT"} disabled>?????? ???? ??????</option>
                        <option value={0}>??????</option>
                        <option value={1}>??????</option>
                    </select>
                </div>
                <div className="addListItem">
                    <label>???????? ????</label>
                    <FormControl sx={{ width: 250 }}>
                        <InputLabel style={{ fontFamily: "yekan" }}>?????????? ???????? ????</InputLabel>
                        <Select
                            multiple
                            value={content}
                            onChange={handleSelectChange}
                            input={<OutlinedInput label="?????????? ???????? ????" />}
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
                    {!isFetching && "?????? ??????????????"}
                </button>
            </form>
        </div>
    )
}

export default NewListItem;