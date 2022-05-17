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
    return fetchIt(`${Settings.API}/comments`, "POST", JSON.stringify(newComment))
}