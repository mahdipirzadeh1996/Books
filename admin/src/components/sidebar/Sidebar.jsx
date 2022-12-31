import {
  Home,
  People,
  MenuBook,
  FormatListNumberedRtl
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                خانه
                <Home className="sidebarIcon" />
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                کاربران
                <People className="sidebarIcon" />
              </li>
            </Link>
            <Link to="/books" className="link">
              <li className="sidebarListItem">
                کتاب ها
                <MenuBook className="sidebarIcon" />
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className="sidebarListItem">
                لیست ها
                <FormatListNumberedRtl className="sidebarIcon" />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
