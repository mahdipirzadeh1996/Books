import { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline, Add } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import moment from 'jalali-moment';

import "./productList.css";
import { BookContext } from "../../context/bookContext/BookContext";
import { getBooks, deleteBook } from "../../context/bookContext/ApiCalls";

export default function ProductList() {
  const [data, setData] = useState([]);
  const { dispatch } = useContext(BookContext);

  const history = useHistory();

  useEffect(() => {
    getBooks(setData, 0, history, dispatch).then(r => r);
  }, []);

  const handleDelete = (id, img, book, bookSummary,) => {
    deleteBook(id, img, book, bookSummary, dispatch);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.id}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "نام کتاب",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.price}
            ریال
          </div>
        );
      },
    },
    {
      field: "buyNum",
      headerName: "تعداد خرید",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.buyNun}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "زمان آپلود شدن",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
              {moment(params.row.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
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
          <div className="productListItem">
            <Link to={{ pathname: "/product/" + params.row.id, book: params.row }}>
              <button className="productListEdit">ویرایش</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id, params.row.img, params.row.book, params.row.bookSummary,)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={r => r.id}
        style={{ direction: "rtl" }}
        components={{
          NoRowsOverlay: () => (
            <div className="noRows">
              <span>
                کتابی موجود نیست
              </span>
            </div>
          )
        }}
      />
      <Link to="/newproduct" className="link">
        <div className={"addBtn"}>
          <Add style={{ transform: "scale(2)" }} />
        </div>
      </Link>
    </div>
  );
}
