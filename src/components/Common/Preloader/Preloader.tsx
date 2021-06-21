import preloader from "../../../assets/images/preloader.svg";
import React from "react";

export type PreloaderPropsType = {

}

let Preloader = (props:PreloaderPropsType) => {
    return <div style={ {backgroundColor: "white"} }>
        <img src={preloader} />
    </div>
}

export default Preloader;