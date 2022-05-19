// imports
// addComment from CommentManager
import { useState } from "react"
import { useEffect } from "react"
import { HumanDateTime } from "../utils/HumanDate"
import { addComment, updateComment } from "./CommentManager"

// export function that handles comment form entry
export const CommentForm = ({ selectPost, setSelectPost, refresh, setRefresh, editForm, setEditForm, editComment, setEditComment, setOpenForm }) => {
    // declare state variable for comment to add
    const [newComment, setComment] = useState("")
        // should have values
        // post id
        // author of comment id (current user)
        // content
    

    useEffect(
        () => {
            editForm ? setComment(editComment):""
        },[]
    )
    // function to handle comment submission
    const submitComment = () => {
        if(newComment.length > 0) {

            const copy = {}
            copy.content = newComment
            copy.post = selectPost.id
            // adds current user id
            // sends to database using function from CommentManager
            addComment(copy)
            .then(() => setComment(""))
            .then(
                () => {
                    setOpenForm(false)
                    setRefresh(!refresh)
                }
            )
            
            // refresh comment list
        } else {
            window.alert("Please fill out your comment before submitting.")
        }
    }


    const updateEditComment = () => {
        const copy = {...editComment}
        copy.content = newComment
        copy.author = editComment.author.id
        copy.post = editComment.post.id
        console.log(copy)
        updateComment(copy)
        .then(
            () => {
                setRefresh(!refresh)
                setEditForm(false)
            }
        )
    }


    return( 
        <>
        

        <label htmlFor="content">{editForm ? "Update Comment":  "Add Comment"}</label>
        <textarea id="content" name="content"
                    onChange={(e) => setComment(e.target.value)}
                    value={newComment.content}>
        </textarea>
        {
            editForm ? 
            <button className="commentSubmit" onClick={(evt) => updateEditComment()}>
            Update Comment
        </button>
        :
        <button className="commentSubmit" onClick={(evt) => submitComment()}>
            Submit Comment
        </button>
    }
    </>
    )
}