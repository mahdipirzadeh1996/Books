import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline, Add } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";

import './list.scss';
import { ListContext } from "../../context/listContext/ListContext";
import { getLists, deleteList } from "../../context/listContext/apiCalls";

const List = () => {
    const [data, setData] = useState([]);
    const [content, setContent] = useState([]);
    const [isDialog, setIsDialog] = useState(false);

    const { dispatch } = useContext(ListContext);

    useEffect(() => {
        getLists(setData, dispatch).then(r => r);
    }, []);

    const openDialog = (rowContent) => {
        setContent(rowContent);
        setIsDialog(true);
    }

    const handleDelete = (id) => {
        deleteList(id, dispatch);
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="listItem">
                        {params.row.id}
                    </div>
                );
            },
        },
        {
            field: "title",
            headerName: "عنوان لیست",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="listItem">
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "content",
            headerName: "محتوای لیست",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="listItem">
                        <button
                            className="listEdit"
                            onClick={() => openDialog(JSON.parse(params.row.content))}
                        >
                            نمایش محتوا
                        </button>
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "عملیات",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="listItem">
                        <Link to={{ pathname: "/listitem/", list: params.row }}>
                            <button className="listEdit">ویرایش</button>
                        </Link>
                        <DeleteOutline
                            className="listDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div className='list'>
            <DataGrid
                rows={data}
                //disableSelectionOnClick
                columns={columns}
                getRowId={r => r.id}
                style={{ direction: "rtl" }}
                components={{
                    NoRowsOverlay: () => (
                        <div className="noRows">
                            <span>
                                لیستی موجود نیست
                            </span>
                        </div>
                    )
                }}
            />
            <Link to="/newlistitem" className="link">
                <div className={"addBtn"}>
                    <Add style={{ transform: "scale(2)" }} />
                </div>
            </Link>

            {
                isDialog
                    ?
                    <div className='dialogConatiner'>
                        <div className='dialogFormContainer'>
                            <form className='dialogForm'>
                                <div className='dialog'>
                                    <div className='dialogClose' onClick={() => setIsDialog(false)}>
                                        <Close className="dialogCloseIcon" />
                                    </div>
                                    {
                                        content.map((item, index) => (
                                            <div key={index} className='dialogItem'>
                                                <div className='num'>
                                                    {++index}.
                                                </div>
                                                <div className='tile'>
                                                    {item}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </form>
                            <form className='dialogFormX' />
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default List;