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
export const createPost = (post) => {
  return fetch(`${Settings.API}/posts`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(post)
  })
}

// export function that deletes a single post "postId => {"
// return a fetch with /${postId},
// method: DELETE
export const deletePost = (id) => {
  return fetch(`${Settings.API}/posts/${id}`, "DELETE")
}

// export a function that edits a post "post => {"
// return fetch with /{post.id}
// method: PUT
// normal headers
// body is stringified json with entry passed as arg
export const editPost = (id) => {
  return fetch(`${Settings.API}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
}

// get posts by user id
export const getUserPosts = (id) => {
  return fetch(`${Settings.API}/posts?user_id=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`,
      "is_user": "true"
    }
  })
};

export const getPostsByTag = (id) => {
  return fetchIt(`${Settings.API}/posts?tag_id=${id}`)
};

export const searchPostTitles = titleString => {
  return fetchIt(`${Settings.API}/posts?title=${titleString}`)
};

export const searchPostCategories = categoryId => {
  return fetchIt(`${Settings.API}/posts?category=${categoryId}`)
};