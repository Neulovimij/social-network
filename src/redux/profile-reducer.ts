import {
    ActionsType,
    AddPostActionType, PostType, ProfileType,
    SetUserProfileActionType,
    UpdateNewPostActionType
} from "./store";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";


const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE"

type InitialStateType = {
    posts: Array<PostType>
    newPostText: string
    profile: ProfileType | null
}

let initialState: InitialStateType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 30},
        {id: 2, message: "It's my first post.", likesCount: 310},
        {id: 3, message: "Blabla", likesCount: 10},
        {id: 4, message: "YoYoYo", likesCount: 11},
    ],
    newPostText: "",
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
    }
};

const profileReduser = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText,
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

export const addPostActionCreator = (): AddPostActionType =>
    ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text: string | undefined): UpdateNewPostActionType =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text}) as UpdateNewPostActionType

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile})

export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data));
        });
}

export default profileReduser;