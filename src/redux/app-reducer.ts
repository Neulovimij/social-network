import {ActionsType, InitializedSuccessActionType, SetUserDataActionType,} from "./store";
import {Dispatch} from "redux";
import {headerAuthMeAPI, ResultCodesEnum} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = "SET-INITIALIZED";

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false,

};

const appReduser = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = (): InitializedSuccessActionType =>
    ({type: SET_INITIALIZED })

export const initializeApp = () => (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
let promise =  dispatch(getAuthUserData())
promise.then( () => {
    dispatch(initializedSuccess())
} )

}



export default appReduser;