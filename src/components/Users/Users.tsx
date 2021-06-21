import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import {toggleFollowingProgress, UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom"
import axios from "axios";
import {usersAPI} from "../../api/api";

type UsersPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, id: number) => void
    followingInProgress: []
}

let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let page = [];
    for (let i = 1; i <= pagesCount; i++) {
        page.push(i);
    }

    return <div>
        <div>
            {page.map(p => {
                return <span className={props.currentPage === p && s.selectedPage}
                             onClick={(e) => {

                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={"/profile/"+ u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto} alt={":)"}/>
                    </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={ props.followingInProgress.some(id => id === u.id) } onClick={ () => {

                                props.toggleFollowingProgress(true, u.id);

                                usersAPI.deleteFollowing(u.id)

                         /*       axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,   {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY":"281c8ae9-01a4-4a38-b0e7-a6ad0aac3a5f"
                                    }
                                })*/
                                    .then(data => {
                                        if(data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.toggleFollowingProgress(false, u.id)
                                    });

                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id===u.id)} onClick={() => {
                                props.toggleFollowingProgress(true, u.id)

                                usersAPI.postFollowing(u.id)
                                    .then(data => {
                                      if(data.resultCode === 0){
                                          props.follow(u.id)
                                      }
                                        props.toggleFollowingProgress(false, u.id)
                                });

                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;