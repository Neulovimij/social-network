import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../Common/FormsControls/FormsControls";


export type DialogFormDataType = {
    newMessageBody: string
}
const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate = {[required, maxLength50]}
                       name={"newMessageBody"}
                       placeholder="Enter your message"/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm<DialogFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)
