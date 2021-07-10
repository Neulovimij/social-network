import {
    ActionsType, SetUserDataActionType,

} from "./store";
import {Dispatch} from "redux";
import {headerAuthMeAPI} from "../api/api";
import {setUserProfile} from "./profile-reducer";

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
    isAuth: boolean
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,

};

const authReduser = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }

        default:
            return state
    }
}

export const setAuthUserData = (userId: string, email: string, login: string): SetUserDataActionType =>
    ({type: SET_USER_DATA, data: {userId, email, login}})

export const getAuthUserData = () => (dispatch: Dispatch) => {
    headerAuthMeAPI.singIn()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        });
}

export const login = (email, password, rememberMe) => (dispatch: Dispatch) => {
    headerAuthMeAPI.singIn()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        });
}



export default authReduser;