import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom"


type UsersPropsType = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: number[]
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


                return <span className={props.currentPage === p ? s.selectedPage:""}
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
                            ? <button disabled={ props.followingInProgress
                                .some(id => id === u.id) } onClick={ () => { props.unfollow(u.id)}
                                }>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id===u.id)} onClick={() => {
                                props.follow(u.id)

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