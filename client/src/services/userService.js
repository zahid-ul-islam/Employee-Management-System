import Axios from "../axios/index.js";

const registerUser = async ({ first_Name, last_Name, email, password }) => {
    try {
        const user = await Axios.post("/users/registration", { first_Name, last_Name, email, password });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}
const userService = {registerUser}
export default userService;
