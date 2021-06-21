import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/store";


export type ProfilePropsType = {
    profile: ProfileType | null
}

const Profile = (props:ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile = {props.profile}/>
            <MyPostsContainer />

        </div>
    );
}
export default Profile;