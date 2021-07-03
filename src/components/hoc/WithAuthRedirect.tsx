import React, {Component, ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";


export type MapStatePropsTypeForRedirect = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppStateType):MapStatePropsTypeForRedirect  => ({
    isAuth: state.auth.isAuth
});

export function WithAuthRedirect <T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStatePropsTypeForRedirect) => {

        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={"/login"}/>
        return <Component {...restProps as T} />
    }

    let  ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)
    return ConnectedAuthRedirectComponent ;
}