// fetch all the tags

const API = 'http://localhost:8000'

export const getAllTags = () => {
  return fetch(`${API}/tags`)
    .then((res) => res.json())
}