import React from 'react';

import "./blocked.scss";
import blockImg from "../../images/block-user.png";

const Blocked = () => {
    return (
        <div className={"blocked"}>
            <form className='bockForm'>
                <img className='blockImg' src={blockImg} alt='' />
                <h1>متاسفانه حساب کاربری شما مصدود شده</h1>
            </form>
        </div>
    )
}

export default Blocked;