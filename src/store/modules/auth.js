import Cookie from "js-cookie";
import router from "../../routers";
import AuthService from "../../services/AuthService";

export default {
	state: {
		overlay: false,
	},
	mutations: {
		overlay(state, val){
			state.overlay = val;
		}
	},
	actions: {
		logout({ commit }) {
			commit("overlay", true);
			var form = new FormData();
			form.append("token", Cookie.get('token'));

			AuthService.logout(form)
			.then((response) => {
				commit("overlay", false);
				if (response.data && response.data.success) {
					Cookie.remove("token");
					router.push("/login");
				} else alert("Logout: No response return");
			})
			.catch((e) => {
				if (e.response) {
					alert(e.response.data.error);
				} else if (e.request) {
					alert("Invalid Request");
				} else if (e.message) {
					alert(e.message);
				}
				commit("overlay", false);
			});
		},
		saveTokenInCookies({ dispatch }, token) {
			console.log(dispatch);
			Cookie.set('token', token);
		}
	},
	getters: {
		overlay(state){
			return state.overlay;
		}
	},
	modules: {
	},
	strict: false
}