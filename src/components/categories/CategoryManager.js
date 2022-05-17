// fetch all the categories

const API = 'http://localhost:8000'

export const getAllCategories = () => {
  return fetch(`${API}/categories`)
    .then((res) => res.json())
}