import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {MyPostPropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../Common/FormsControls/FormsControls";


const MyPosts = (props: MyPostPropsType) => {

    //let state = store.getState().profilePage;

    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const addNewPost = (formData: MyPostFormDataType) => {
        props.addPost(formData.newPostMessage)
    }

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My Posts</h3>
            </div>
            <div>
                <AddPostReduxForm onSubmit={addNewPost} />
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

type MyPostFormDataType = {
    newPostMessage: string
}

const maxLength10 = maxLengthCreator(10)

const AddPostForm: React.FC<InjectedFormProps<MyPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostMessage"}
                       placeholder="Enter your message" validate = {[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm<MyPostFormDataType>({form: "myPostAddMessageForm"})(AddPostForm)


export default MyPosts;