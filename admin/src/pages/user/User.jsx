import {
  CalendarToday,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./user.css";

export default function User() {
  const location = useLocation();
  const user = location.user;

  const [status, setStatus] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [])

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.name} {user.family}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>

            <div className="userTitleContainer">
              <button className="userAddButton" disabled>{user.status === 0 ? "Active" : "Block"}</button>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  placeholder={user.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Family</label>
                <input
                  type="text"
                  placeholder={user.family}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={user.phone}
                  className="userUpdateInput"
                />
              </div>

              <div style={{display: "flex", marginTop: "5px"}}>
                <div className="userTitleContainer">
                  <button className="userAddButton">Active</button>
                </div>
                <div className="userTitleContainer">
                  <button className="userAddButton" style={{backgroundColor: "red"}}>Block</button>
                </div>
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
