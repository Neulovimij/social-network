import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter } from "react-router-dom";
import {ProfileType} from "../../redux/store";
import {profileAPI} from "../../api/api";

export type PathParamsType = {
    userId: string
}

export type ProfileContainerWithRouterPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

type MapStatePropsType = {
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileType) => void
}

type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileContainerWithRouterPropsType> {



    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {

            userId = "2";
        }
        profileAPI.getProfile(userId)
        /*axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+ userId)*/
            .then(data => {
                this.props.setUserProfile(data);
            });
    }

    render() {

        return (
            <Profile {...this.props} profile = {this.props.profile} />
        );
    }
}
let mapStateToProps = (state: AppStateType):MapStatePropsType  => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent =  withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);