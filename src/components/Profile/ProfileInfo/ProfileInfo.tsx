import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader/Preloader";
import {ProfileType} from "../../../redux/store";


export type ProfileInfo ={
    profile: ProfileType | null
}

const ProfileInfo = (props:ProfileInfo) => {
    if(!props.profile ){
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img src="https://i1.7fon.org/thumb/x144581.jpg"/>
            </div>
            <div className={s.discriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + Description
            </div>
        </div>
    );
}
export default ProfileInfo;