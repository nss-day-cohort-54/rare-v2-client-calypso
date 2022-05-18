// imports
// function that gets comments by postId
// function that deletes comments by commentId
// function that adds a comment
// Component for comment form

import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getSinglePost } from "../posts/PostManager"
import { Comment } from "./Comment"
import { CommentForm } from "./CommentForm"
import { deleteComment } from "./CommentManager"


// export component CommentList that is a single post's comments

// From Individual Post Component
    // <CommentList postId={id} /> - displayed on a boolean
export const CommentList = ({ selectPost, setSelectPost, refresh, setRefresh }) => {
    // declare state variable for comments array
    // const [comments, setComments] = useState([])
    const [comments, setComments] = useState([])
    


    /* 
        invoke function
        getCommentsByPostId()
            then set comments from returned data
            .then((comments) => setComments(comments))
        empty dependency array to run on page load
    */

  

    // any other functions?
    // deleteComment
        // takes commentId param
        // invokes fetch function deleteComment()

    // addComment
        // builds proper comment



    return <>

   
    
    {/* <CommentForm postId={postId} /> */}
    <CommentForm selectPost = {selectPost} setSelectPost={setSelectPost} refresh = {refresh} setRefresh = {setRefresh}/>
    {/* 
        map over comments and invoke comment component
        other needed JSX tags for styling
    */}
    {
        selectPost?.comments.map(comment => {
            let currentAuthor = comment.user?.id === parseInt(localStorage.getItem("token"))
            return <div key={`comment--${comment.id}`}>
                    <Comment postId={comment.id} commentObject={comment} currentAuthor={currentAuthor}/>
                    <button onClick={
                        () => {
                            deleteComment(comment.id)
                            .then(
                                () => {
                                    setRefresh(!refresh)
                                }
                            )
                        }
                    }>Delete Comment

                    </button>
                </div>
        })
    }
    
    </>
}