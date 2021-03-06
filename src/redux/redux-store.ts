import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReduser from "./profile-reducer";
import dialodsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReduser from "./users-reducer";
import authReduser from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReduser from "./app-reducer";

const rootReducer = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialodsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser,
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

export type StoreReduxType = typeof store

//window.store = store

export default store
