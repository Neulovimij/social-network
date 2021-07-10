import React from "react";

export const required = (value: string) => {
    if (value) return undefined;
    return "Field is required";
}



export const maxLengthCreator = (maxLenght:number) => (value: string) => {
    if (value.length > maxLenght ) return `Max lenght is ${maxLenght} symbols`;
    return undefined;

}