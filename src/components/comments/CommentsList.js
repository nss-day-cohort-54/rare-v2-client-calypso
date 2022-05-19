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
    const [openForm, setOpenForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [editComment, setEditComment] =useState({})


    const showButtons = (comment) => {
        console.log(comment.is_user)
        return comment.is_user ? 
        <>
        
           <button
           onClick={
               () => {
                   setEditForm(true)
                   setEditComment(comment)
                   setOpenForm(false)
               }
           }
           >Edit Comment</button> 
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
        
        
        </>
     : ""

    }


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
    <button onClick={
        () => {
            setOpenForm(!openForm)
            setEditForm(false)
        }
    }>New Comment</button>
    
    {
        openForm ? 
        <>
        <CommentForm selectPost = {selectPost} setSelectPost={setSelectPost} refresh = {refresh} setRefresh = {setRefresh} editForm = {editForm} setEditForm = {setEditForm} editComment={editComment} setEditComment={setEditComment} setOpenForm={setOpenForm}/>
        <button
        onClick={
            () => {
                setOpenForm(false)
            }
        }
        
        >Discard Comment</button>
        </>
        :""
    }

    {
        editForm ? 
        <>
        <CommentForm selectPost = {selectPost} setSelectPost={setSelectPost} refresh = {refresh} setRefresh = {setRefresh} editForm = {editForm} setEditForm = {setEditForm} editComment={editComment} setEditComment={setEditComment} setOpenForm={setOpenForm}/>
        </>
        :""
        
    }
    {
        selectPost?.comments.map(comment => {
            
            return <div key={`comment--${comment.id}`}>
                    
                    <Comment postId={comment.id} commentObject={comment}/>
                    {showButtons(comment)}
                    
                </div>
        })
    }
    
    </>
}