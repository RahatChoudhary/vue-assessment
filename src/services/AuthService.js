import http from "../http-common";

class AuthService {
	register(params) {
		return http.post("/api/register", params);
	}

	login(params) {
		return http.post("/api/login", params);
	}

	logout(params) {
		return http.post("/api/logout", params);
	}
}

export default new AuthService();