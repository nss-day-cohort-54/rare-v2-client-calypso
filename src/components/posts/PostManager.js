import { fetchIt } from "../utils/Fetch";
import { Settings } from "../utils/Settings"


export const getAllPosts = () => {
  return fetch(`${Settings.API}/posts`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
}

// export function that fetches single post, needs param to take id as arg, then parse from json to js

export const getSinglePost = (id) => {
  return fetchIt(`${Settings.API}/posts/${id},`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
    .then(res=>res.json())
};
// export function that adds post
export const createPost = (post) => {
  return fetchIt(`${Settings.API}/posts`, {
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
  return fetch(`${Settings.API}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
}

// export a function that edits a post "post => {"
// return fetch with /{post.id}
// method: PUT
// normal headers
// body is stringified json with entry passed as arg
export const editPost = (id) => {
  return fetchIt(`${Settings.API}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
}

// get posts by user id
export const getUserPosts = (id) => {
  return fetchIt(`${Settings.API}/posts?user_id=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(res=>res.json())
};

export const getPostsByTag = (id) => {
  return fetchIt(`${Settings.API}/posts?tag_id=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(res=>res.json())
};
// get posts by categoryId
// export const getPostsByCategoryId = (categoryId) => {
//   return fetch(`http://localhost:8088/posts?categoryId=${categoryId}`)
//   .then(response => response.json())
// }

// create post
// export const createPost = (body) => {
//   return fetch(`http://localhost:8088/posts`, {

//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   }).then((response) => response.json());
// };

export const searchPostTitles = titleString => {
  return fetch(`http://localhost:8000/posts?title=${titleString}`)
    .then(res => res.json())
};

export const searchPostCategories = categoryId => {
  return fetch(`http://localhost:8000/posts?category=${categoryId}`)
    .then(res => res.json())
};