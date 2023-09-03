import axios from "axios"

const addUserToDb = (name , email) => {
    const user = {
        name,
        email
    }
    return axios.post('http://localhost:5000/user/addUserToDb', user)
    
}

export default addUserToDb;