// fetch all the categories

const API = 'http://localhost:8000'

export const getAllCategories = () => {
  return fetch(`${API}/categories`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
    .then((res) => res.json())
}