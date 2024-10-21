import axios from "axios";

const API_BASE_URL = "http://localhost:8080/capstonecupid/user";

class AuthService {
    login(user) {
        return axios.post(`${API_BASE_URL}/login`, user)
    }

    logout() {
        // remove the token from localstorage
        localStorage.removeItem("jwt-token");
        localStorage.removeItem("user-role");
        localStorage.removeItem("token-expiry");

        return axios.post(`${API_BASE_URL}/logout`)
    }

    // logout(users){
    //     window.localStorage.removeItem("jwt-token");
    //     router.push("/");
    // }
}

export default new AuthService();