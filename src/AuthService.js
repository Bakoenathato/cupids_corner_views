import axios from "axios";

const API_BASE_URL = "http://localhost:8080/capstonecupid/user";

class AuthService {
    login(user) {
        return axios.post(`${API_BASE_URL}/login`, user)
    }
    logout(users){
        window.localStorage.removeItem("jwt-token");
        router.push("/");
    }
}

export default new AuthService();