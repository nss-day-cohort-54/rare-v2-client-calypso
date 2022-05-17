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

export const getCategoryById = (catId) => {
  return fetch (`${API}/categories/${catId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  })
  .then(res => res.json())
}

export const deleteCategory = (catId) => {
  return fetch (`${API}/categories/${catId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`}
  })
}

export const editCategory = (category) => {
  return fetch(`${API}/categories/${category.id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(category)
  })
}