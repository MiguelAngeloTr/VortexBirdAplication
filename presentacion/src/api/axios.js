import axios from 'axios'

const instace = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true
})
export default instace