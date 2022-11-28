<template>
	<div>
		<v-app id="inspire" v-if="!login">
			<v-main>
				<v-container fluid fill-height>
					<v-layout align-center justify-center>
						<v-flex xs12 sm8 md4>
							<v-card class="elevation-12">
								<v-toolbar dark color="#1e1e2d">
									<v-toolbar-title>Home Page</v-toolbar-title>
								</v-toolbar>
								<v-card-actions>
									<v-btn color="#1e1e2d" dark @click="gotToRegister()">Register</v-btn>
									<v-spacer></v-spacer>
									<v-btn color="#1e1e2d" dark @click="gotToLogin()">Login</v-btn>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-main>
		</v-app>
		<to-do v-if="login"></to-do>
	</div>		
</template>

<script>
	import router from "../routers";
	import Cookie from "js-cookie";
	import ToDo from './ToDo.vue';
	
	export default {
		components: { ToDo },
		data: () => ({
			accessCode: null,
			verifyCode: null
		}),
		computed: {
			login(){
				let loggedIn = false;
				let res = Cookie.get('token');
				if(res) loggedIn = true;
				return loggedIn;
			}
		},
		methods: {
			gotToLogin() {
				router.push("/login");
			},
			gotToRegister() {
				router.push("/register");
			}
		}
	};
</script>