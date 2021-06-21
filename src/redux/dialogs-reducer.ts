import {
    ActionsType,
    SendNewMessageActionType,
    UpdateMessageActionType
} from "./store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY"
const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
    dialogs: [
        {id: 1, name: "Alex"},
        {id: 2, name: "Dimych"},
        {id: 3, name: "Andrey"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Victor"},
        {id: 6, name: "Sveta"},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "How is your it-Kamasutra?"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
        {id: 6, message: "Yo"},
    ]as Array<MessageType>,
    newMessageBody: ""
};

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

export type InitialStateType = typeof initialState

const dialodsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageBody: action.body
            };
        }
        case SEND_MESSAGE: {
            let body = state.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 7, message: body}],
                newMessageBody: "",
            };
        }
        default:
            return state
    }
}

export const updateNewMessageBodyCreator = (body: string): UpdateMessageActionType =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body})

export const sendMessageActionCreator = (newMessage: string): SendNewMessageActionType =>
    ({type: SEND_MESSAGE, newMessage: newMessage})

export default dialodsReducer;