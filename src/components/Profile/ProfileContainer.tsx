import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {ProfileType} from "../../redux/store";
import {WithAuthRedirect} from "../hoc/WithAuthRedirect";
import {compose} from "redux";


export type PathParamsType = {
    userId: string
}

export type ProfileContainerWithRouterPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

type MapStatePropsType = {
    profile: ProfileType | null
    }

export type MapStatePropsTypeForRedirect = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
}

type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType & MapStatePropsTypeForRedirect

class ProfileContainer extends React.Component<ProfileContainerWithRouterPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = "2";
        }
        this.props.getUserProfile(userId);
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

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    //WithAuthRedirect
)(ProfileContainer)