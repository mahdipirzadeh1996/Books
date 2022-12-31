import React, { useState } from 'react';
import { ArrowBackOutlined } from "@material-ui/icons";
import { useHistory } from 'react-router';

import "./navbarBook.scss";
import logo from "../../images/medilogo.png";

const NavbarBook = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const history = useHistory();

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset > 0);
        return () => (window.onscroll = null);
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        
        history.goBack();
    }

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className={"container"}>
                <div className={"right"}>
                    <img src={logo} alt='' />
                </div>
            </div>
        </div>
    )
}

export default NavbarBook;