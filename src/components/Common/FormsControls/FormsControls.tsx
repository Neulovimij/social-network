import React from "react";
import s from "./FormsControls.module.css"
import {WrappedFieldProps} from "redux-form";

const FormControl: React.FC<WrappedFieldProps> = ({meta: {touched, error}, children}) =>{
    const hasError =  touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "") }>
            <div>
                {children}
            </div>
            { hasError && <span>{error}</span> }
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return ( <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>)
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return ( <FormControl {...props}><input {...input} {...restProps} /></FormControl>)
}