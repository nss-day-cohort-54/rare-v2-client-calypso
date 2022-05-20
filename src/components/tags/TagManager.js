// fetch all the tags

import { searchPostCategories } from "../posts/PostManager"
import { fetchIt } from "../utils/Fetch"


const API = 'http://localhost:8000'

export const getAllTags = () => {
  return fetch(`${API}/tags`, {
  headers: {
    "Authorization": `Token ${localStorage.getItem("token")}`
}})
    .then((res) => res.json())
}

export const getTag = (tagId) => {
  return fetch(`${API}/tags/${tagId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }})
    .then((r) => r.json())
}

export const createTags = (tag) => {
  return fetch(`${API}/tags`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Token ${localStorage.getItem("token")}`
},
body: JSON.stringify(tag)
})
    .then((res) => res.json())
}

export const deleteTag = (tagId) => {
  return fetch(`${API}/tags/${tagId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
}

export const updateTags = (updatedTag) => {
  return fetch(`${API}/tags/${updatedTag.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(updatedTag)
  })
}

export const updatePostTags = (newPost) => {
  return fetch(`${API}/posts/${newPost.id}/updatePostTags`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(newPost)})
}