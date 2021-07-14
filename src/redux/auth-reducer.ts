import {ActionsType, SetUserDataActionType,} from "./store";
import {Dispatch} from "redux";
import {headerAuthMeAPI, ResultCodesEnum} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET-USER-DATA";
/*const UNFOLLOW = "UNFOLLOW";*/


export type UserType = {
    id: number
    photos: PhotoType
    small: string
    followed: boolean
    name: string
    status: string
    location: UsersLocationType
}
export type PhotoType = {
    small: string
}
export type UsersLocationType = {
    city: string
    country: string
}

type InitialStateType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    //captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    //captchaUrl: null
};

const authReduser = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionType =>
    ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}})

export const getAuthUserData = () => (dispatch: Dispatch) => {
    return headerAuthMeAPI.singIn()
        .then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
}

export const login = (email:string | null, password:string, rememberMe:boolean) => (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    headerAuthMeAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(getAuthUserData()) ;
            } else {
                let message = data.messages.length > 0 ? data.messages[0] : "Some error"
                // @ts-ignore
                dispatch(stopSubmit("login", {_error: message}))
            }
        });
}

export const logOut = () => (dispatch: Dispatch) => {
    headerAuthMeAPI.logOut()
        .then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
}


export default authReduser;