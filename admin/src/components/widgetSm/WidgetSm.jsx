import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import {useEffect, useState} from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUser = async () => {
      try {
        const res = await axios("/users?new=true", {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWQzZGIwMGYzYmRhMWZiODk3MWNiMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyOTUwNzA0NiwiZXhwIjoxNjI5OTM5MDQ2fQ.8w5wIjTGLYGHoVCnWCx8wc-J-VAKHmu1EAngL9MxyFo"
          }
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    //getNewUser();
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
            <li className="widgetSmListItem">
              <img
                  src={user.profilePic || "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"}
                  alt=""
                  className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
        ))}
      </ul>
    </div>
  );
}
