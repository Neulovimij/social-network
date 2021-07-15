import {
    ActionsType,
    FollowActionType,
    SetCurrentPageActionType,
    SetTotalUsersCountActionType,
    SetUsersActionType, ToggleFollowingProgressActionType,
    ToggleIsFetchingActionType,
    UnFollowActionType,
} from "./store";
import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS"


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
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}

let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],

};

const usersReduser = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return <InitialStateType>{
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state
    }
}

export const followSuccess = (userId: number): FollowActionType =>
    ({type: FOLLOW, userId})

export const unfollowSuccess = (userId: number): UnFollowActionType =>
    ({type: UNFOLLOW, userId})

export const setUsers = (users: Array<UserType>): SetUsersActionType =>
    ({type: SET_USERS, users})

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType =>
    ({type: SET_CURRENT_PAGE, currentPage})

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType =>
    ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType =>
    ({type: TOGGLE_IS_FETCHING, isFetching})

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

export const follow = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, id));
        usersAPI.postFollowing(id)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followSuccess(id));
                }
                dispatch(toggleFollowingProgress(false, id));
            });
    }
}

export const unfollow = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgress(true, id));
        usersAPI.deleteFollowing(id)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(id));
                }
                dispatch(toggleFollowingProgress(false, id));
            });
    }
}

export default usersReduser;