import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.css";


export type HeaderPropsType = {
    isAuth: boolean
    login: string | null
}
const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://www.logodesign.net/images/nature-logo.png" alt="picture"/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    );
}
export default Header;
