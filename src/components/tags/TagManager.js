// fetch all the tags

const API = 'http://localhost:8088'

export const getAllTags = () => {
  return fetch(`${API}/tags`)
    .then((res) => res.json())
}