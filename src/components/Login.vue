<template>
	<div>
		<v-app id="inspire">
			<v-main>
				<v-container fluid fill-height>
					<v-layout align-center justify-center>
						<v-flex xs12 sm8 md4>
							<v-card class="elevation-12">
								<v-toolbar dark color="#1e1e2d">
									<v-toolbar-title>Login Form</v-toolbar-title>
									<v-spacer></v-spacer>
									<v-btn dark @click="backToHome()">Home</v-btn>
								</v-toolbar>
								<v-card-text>
									<v-form>
										<v-text-field
											v-model="accessCode"
											prepend-icon="mdi-account"
											label="Username"
											name="username"
											type="text"
											dense
											outlined
											color="#0000FF"
											hide-details
											class="pb-5"
										/>
										<v-text-field
											v-model="verifyCode"
											prepend-icon="mdi-lock"
											label="Password"
											name="password"
											type="password"
											dense
											outlined
											color="#0000FF"
											hide-details
											v-on:keyup.enter="login"
										/>
									</v-form>
								</v-card-text>
								<v-card-actions>
									<v-btn color="#1e1e2d" dark @click="login">Login</v-btn>
									<v-spacer></v-spacer>
									<v-btn color="#1e1e2d" dark @click="goToRegisterPage">Register</v-btn>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-main>
		</v-app>
	</div>		
</template>

<script>
	import AuthService from "../services/AuthService";
	import router from "../routers";
	
	export default {
		data: () => ({
			accessCode: null,
			verifyCode: null
		}),
		methods: {
			login() {
				if(!this.accessCode){
					alert('Username Is Required');
					return;
				}
				if(!this.verifyCode){
					alert('Password Is Required');
					return;
				}
				this.$store.commit('overlay', true);
				var form = new FormData();
				form.append("email", this.accessCode);
				form.append("password", this.verifyCode);

				AuthService.login(form)
				.then((response) => {
					this.$store.commit("overlay", false);
					if (response.data && response.data.success) {
						this.$store.dispatch('saveTokenInCookies', response.data.user.token);
						router.push('/');
					} else alert("No response return");
				})
				.catch((e) => {
					if (e.response) {
						if(e.response.data.error){
							alert(e.response.data.error);
						}
						if(e.response.data.message){
							alert(e.response.data.message);
						}
					} else if (e.request) {
						alert("Invalid Request");
					} else if (e.message) {
						alert(e.message);
					}
					this.$store.commit("overlay", false);
				});
			},
			backToHome() {
				router.push('/');
			},
			goToRegisterPage() {
				router.push('/register');	
			}
		}
	};
</script>