import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {ProfileType} from "../../redux/store";
import {compose} from "redux";


export type PathParamsType = {
    userId: string | undefined
}

export type ProfileContainerWithRouterPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: string | null
    isAuth: boolean,
    }

export type MapStatePropsTypeForRedirect = {
    isAuth: boolean,

}

type MapDispatchPropsType = {
    getUserProfile: (userId: string | null) => void
    getUserStatus: (userId: string | null) => void
    updateUserStatus: (status: string) => void
}

type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType & MapStatePropsTypeForRedirect

class ProfileContainer extends React.Component<ProfileContainerWithRouterPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId || null;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile = {this.props.profile}
                     status = {this.props.status}
                     updateUserStatus = {this.props.updateUserStatus} />
        );
    }
}

let mapStateToProps = (state: AppStateType):MapStatePropsType  => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
)(ProfileContainer)