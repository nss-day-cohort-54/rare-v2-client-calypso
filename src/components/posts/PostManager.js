import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings"


export const getAllPosts = () => {
  return fetchIt(`${Settings.API}/posts`)
}

// export function that fetches single post, needs param to take id as arg, then parse from json to js
export const getSinglePost = (id) => {
  return fetchIt(`${Settings.API}/posts/${id}`)
};
// export function that adds post
export const createPost = (newPost) => {
  return fetchIt(`${Settings.API}/posts`, "POST", JSON.stringify(newPost))
}

// export function that deletes a single post 
export const deletePost = (id) => {
  return fetchIt(`${Settings.API}/posts/${id}`, "DELETE")
}

// export a function that edits a post 
export const editPost = (post) => {
  return fetchIt(`${Settings.API}/posts/${post.id}`, "PUT", JSON.stringify(post))
}

// get posts by user id
export const getUserPosts = (id) => {
  return fetchIt(`${Settings.API}/posts?user_id=${id}`)
};
// export a function that call a custom action to get posts for a logged in user
export const getLoggedInUserPosts = () => {
  return fetchIt(`${Settings.API}/posts/getPostForLoggedInUser`)
}
// filters posts by tag
export const getPostsByTag = (id) => {
  return fetchIt(`${Settings.API}/posts?tag_id=${id}`)
};
// filters posts by title
export const searchPostTitles = titleString => {
  return fetchIt(`${Settings.API}/posts?title=${titleString}`)
};
// filters posts by category
export const searchPostCategories = categoryId => {
  return fetchIt(`${Settings.API}/posts?category=${categoryId}`)
};