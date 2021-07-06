import React from "react";
import s from "./ProfileStatus.module.css";


export type ProfileStatusType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false,
        title: "yo"
    }
    activateEditMode()  {
        this.setState({
            editMode: true
        });
    }
    deactivateEditMode()  {
        this.setState({
            editMode: false
        });
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode.bind(this) }>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur = { this.deactivateEditMode.bind(this) } value={this.props.status}/>
                </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;