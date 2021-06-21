import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import store, {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {PostType} from "../../../redux/store";
import {MyPostPropsType} from "./MyPostsContainer";

/*type MyPostsType = {
    message: string
    posts: Array<PostType>
    addPost:()=> void
    onPostChange: (text:string) => void
}*/

const MyPosts = (props: MyPostPropsType) => {

    //let state = store.getState().profilePage;

    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let onAddPost = () => {
        props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current ? newPostElement.current.value: '' ;
        props.updateNewPostText(text);

    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My Posts</h3>
            </div>
            <div>
                <div>
                    <textarea ref={newPostElement} value={props.newPostText} onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>

            <div>
                New post
            </div>
            <div className={s.posts}>
                <div className={s.item}>
                    {postsElements}
                </div>
            </div>
        </div>

    );
}
export default MyPosts;