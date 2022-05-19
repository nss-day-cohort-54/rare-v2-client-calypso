import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// getCommentsByPostId
export const getCommentsByPostId = (postId) => {
    return fetchIt(`${Settings.API}/comments?post=${postId}`)
}

// deleteComment
export const deleteComment = (commentId) => {
    return fetch(`${Settings.API}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

// addComment
export const addComment = (newComment) => {
    return fetch(`${Settings.API}/comments`, {
    method: "POST", 
    headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    },
    body:JSON.stringify(newComment)
}
)}

export const updateComment = (newComment) => {
    return fetch(`${Settings.API}/comments/${newComment.id}`, {
    method: "PUT", 
    headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    },
    body:JSON.stringify(newComment)
}
)}
