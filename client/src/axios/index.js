import axios from "axios";
const Axios = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1500,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
})
export default Axios;