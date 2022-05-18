import { fetchIt } from "../utils/Fetch"
import { Settings } from "../utils/Settings"

const API = 'http://localhost:8000'
// get all users fetch
// server returns user array with following properties for each user
// id
// first_name
// last_name
// username
// email
export const getAllUsers = () => {
    return fetch(`${API}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        } 
    })
    .then((res)=> res.json())
}

// get single user by user id
// returns user object with posts array embedded
// user object should have all properties except password
export const getSingleUser = (id) => {
    return fetch(`${API}/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then((res)=> res.json())
}