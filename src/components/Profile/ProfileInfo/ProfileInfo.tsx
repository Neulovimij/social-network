import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import {ProfileType} from "../../../redux/store";
import ProfileStatus from "./ProfileStatus"

export type ProfileInfo ={
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileInfo = (props:ProfileInfo) => {
    if(!props.profile ){
        return <Preloader/>
    }
    return (
        <div>
            {/*<div>
                <img src="https://i1.7fon.org/thumb/x144581.jpg"/>
            </div>*/}
            <div className={s.discriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status = {props.status} updateUserStatus = {props.updateUserStatus} />
            </div>
        </div>
    );
}
export default ProfileInfo;