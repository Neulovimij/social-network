import React from "react";
import s from "./Post.module.css";

type PostPropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201907/imgonline-com-ua-FrameBlurred-_14.jpeg?m6aZMJ2FuRNdIJhw9MbIpcGgJvY3yzW6&size=770:433" alt={"image"}/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>

        </div>
    )
}
export default Post;