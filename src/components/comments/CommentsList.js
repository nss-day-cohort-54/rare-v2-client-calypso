// imports
// function that gets comments by postId
// function that deletes comments by commentId
// function that adds a comment
// Component for comment form

import { useState, useEffect } from "react"
import { Comment } from "./Comment"
import { CommentForm } from "./CommentForm"
import { getCommentsByPostId } from "./CommentManager"


// export component CommentList that is a single post's comments

// From Individual Post Component
    // <CommentList postId={id} /> - displayed on a boolean
export const CommentList = ({ postId }) => {
    // declare state variable for comments array
    // const [comments, setComments] = useState([])
    const [comments, setComments] = useState([])
    // useEffect that pulls comments by postId

    useEffect(
        () => {
            if(postId) {
                getComments(postId)
            }
        },
        [postId]
    )
    /* 
        invoke function
        getCommentsByPostId()
            then set comments from returned data
            .then((comments) => setComments(comments))
        empty dependency array to run on page load
    */

    const getComments = (postId) => {
        getCommentsByPostId(postId)
            .then(setComments)
    }

    // any other functions?
    // deleteComment
        // takes commentId param
        // invokes fetch function deleteComment()

    // addComment
        // builds proper comment


    return <>
    comments
    {/* <CommentForm postId={postId} /> */}
    <CommentForm postId={postId} getComments={getComments}/>
    {/* 
        map over comments and invoke comment component
        other needed JSX tags for styling
    */}
    {
        comments.map(comment => {
            let currentAuthor = comment.user.id === parseInt(localStorage.getItem("token"))
            return <div key={`comment--${comment.id}`}>
                    <Comment postId={postId} commentObject={comment} currentAuthor={currentAuthor} getComments={getComments} />
                </div>
        })
    }
    
    </>
}