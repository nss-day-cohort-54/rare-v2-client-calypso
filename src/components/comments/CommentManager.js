import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

// getCommentsByPostId
export const getCommentsByPostId = (postId) => {
    return fetchIt(`${Settings.API}/comments?post=${postId}`)
}

// deleteComment
export const deleteComment = (commentId) => {
    return fetchIt(`${Settings.API}/comments/${commentId}`, "DELETE")
}

// addComment
export const addComment = (newComment) => {
    return fetchIt(`${Settings.API}/comments`, "POST", JSON.stringify(newComment))
}