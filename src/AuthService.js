import axios from "axios";

const API_BASE_URL = "http://localhost:8080/capstonecupid/user";

class AuthService {
    login(user) {
        return axios.post(`${API_BASE_URL}/login`, user)
    }

}

export default new AuthService();