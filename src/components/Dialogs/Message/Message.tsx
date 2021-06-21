import React from "react";
import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

type MessagePropsType = {
    message: string
}

const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <div className={s.dialog}>{props.message}</div>
    )
}

export default Message;