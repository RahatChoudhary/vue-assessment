import http from "../http-common";
import Cookie from "js-cookie";

class ToDoService {
	getToDoItems(page) {
		var api_url = "/api/items?page="+page;
		return http.get(api_url, {
			headers: {
				Authorization: 'Bearer' + Cookie.get("token"),
			},
		});
	}

	createToDoItems(params) {
		return http.post("/api/item", params, {
			headers: {
				Authorization: 'Bearer' + Cookie.get("token"),
			},
		});
	}

	updateToDoItems(id, params) {
		let api_url = '/api/item/'+id;
		return http.put(api_url, params, {
			headers: {
				Authorization: 'Bearer' + Cookie.get("token"),
			},
		});
	}
}

export default new ToDoService();