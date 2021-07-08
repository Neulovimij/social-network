import {
    ActionsType,
    AddPostActionType, PostType, ProfileType,
    SetUserProfileActionType, SetUserStatusActionType,
    UpdateNewPostActionType
} from "./store";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";


const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_USER_STATUS = "SET-USER-STATUS"


type InitialStateType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string
}

let initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 30},
        {id: 2, message: "It's my first post.", likesCount: 310},
        {id: 3, message: "Blabla", likesCount: 10},
        {id: 4, message: "YoYoYo", likesCount: 11},
    ],
    profile: {
        "aboutMe": "я круто чувак 1001%",
        "contacts": {
            "facebook": "facebook.com",
            "website": null,
            "vk": "vk.com/dimych",
            "twitter": "https://twitter.com/@sdf",
            "instagram": "instagra.com/sds",
            "youtube": null,
            "github": "github.com",
            "mainLink": null
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "не ищу, а дурачусь",
        "fullName": "samurai dimych",
        "userId": 2,
        "photos": {
            "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
            "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
        }
    },
    status: ""
};

const profileReduser = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostMessage,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            };
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status,
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            };
        }
        default:
            return state
    }
}

export const addPostActionCreator = (newPostMessage: string): AddPostActionType =>
    ({type: ADD_POST, newPostMessage})

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile})

export const setUserStatus = (status: string): SetUserStatusActionType =>
    ({type: SET_USER_STATUS, status})

export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data));
        });
}

export const getUserStatus = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
            dispatch(setUserStatus(data));
        });
}

export const updateUserStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status));
            }
        });
}

export default profileReduser;