import React from "react";
import {DialogsPageType, sendMessageActionCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchPropsType = {
    sendMessage: (body:string) => void
    updateNewMessageBody: (body: string)=> void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType  => {
return {
    dialogsPage: state.dialogsPage,
}
}
let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (body:string) => {
            dispatch(sendMessageActionCreator(body));
        },
        updateNewMessageBody: (body: string)=> {
            dispatch(updateNewMessageBodyCreator(body));
        },
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);



export default DialogsContainer;