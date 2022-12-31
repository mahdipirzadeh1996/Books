import { DataGrid } from "@material-ui/data-grid";
import { useState, useEffect, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

import "./userList.css";
import { UserContext } from "../../context/userContext/UserContext";
import { getUsers, updateUser } from "../../context/userContext/ApiCalls";

const override = css`
  display: block;
  border-color: red;
`;

export default function UserList() {
  const [data, setData] = useState([]);
  const { isFetching, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(setData, dispatch).then(r => r);
    //setData(JSON.parse(localStorage.getItem("users")));
  }, []);

  const handleStatus = (row) => {
    let status;
    if (row.status === 0) {
      status = 1;
    } else if (row.status === 1) {
      status = 0;
    }

    updateUser(row.phone, status, setData, dispatch);
    getUsers(setData, dispatch).then(r => r);
  };

  const columns = [
    {
      field: "phone",
      headerName: "موبایل",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListItem">
            {params.row.phone}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "وضعیت",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListItem">
            {params.row.status === 0 ? "فعال" : "بلاک"}
          </div>
        );
      },
    },
    {
      field: "buyMount",
      headerName: "مبلغ پرداخت شده",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListItem">
            {params.row.buyMount}
            ریال
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
          <div className="userListItem">
            <button
              className={params.row.status === 0 ? "userListBlock" : "userListActive"}
              disabled={isFetching}
              onClick={() => handleStatus(params.row)}
            >
              <BeatLoader color={"#fff"} loading={isFetching} css={override} size={10} />
              {!isFetching && (params.row.status === 0 ? "بلاک" : "فعال کردن")}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        style={{ direction: "rtl" }}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        getRowId={r => r.phone}
        components={{
          NoRowsOverlay: () => (
            <div className="noRows">
              <span>
                کاربری موجود نیست
              </span>
            </div>
          )
        }}
      />
    </div>
  );
}