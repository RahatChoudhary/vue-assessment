<template>
	<div>
		<v-app id="inspire">
			<v-main>
				<v-container fluid fill-height>
					<v-layout align-center justify-center>
						<v-flex xs12 sm8 md4>
							<v-card class="elevation-12">
								<v-toolbar dark color="#1e1e2d">
									<v-toolbar-title>Register Form</v-toolbar-title>
									<v-spacer></v-spacer>
									<v-btn dark @click="backToHome()">Home</v-btn>
								</v-toolbar>
								<v-card-text>
									<v-form>
										<v-text-field
											v-model="email"
											prepend-icon="mdi-account"
											label="Email"
											name="email"
											type="email"
											dense
											outlined
											color="#0000FF"
											hide-details
											class="pb-5"
										/>
										<v-text-field
											v-model="password"
											prepend-icon="mdi-lock"
											label="Password"
											name="password"
											type="password"
											dense
											outlined
											color="#0000FF"
											hide-details
											class="pb-5"
										/>
										<v-text-field
											v-model="confirmPassword"
											prepend-icon="mdi-lock"
											label="Confirm Password"
											name="cPassword"
											type="password"
											dense
											outlined
											color="#0000FF"
											hide-details
											v-on:keyup.enter="register"
										/>
									</v-form>
								</v-card-text>
								<v-card-actions>
									<v-btn color="#1e1e2d" dark @click="register">Register</v-btn>
									<v-spacer></v-spacer>
									<v-btn color="#1e1e2d" dark @click="goToLoginPage">Login</v-btn>
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
			email: null,
			password: null,
			confirmPassword: null
		}),
		methods: {
			register() {
				if(!this.email){
					alert('Email Is Required');
					return;
				}
				if(!this.password){
					alert('Password Is Required');
					return;
				}
				if(!this.confirmPassword){
					alert('Confirm Password Is Required');
					return;
				}
				if(this.password !== this.confirmPassword){
					alert('Confirm Password Must Matched With Passowd Field');
					return;
				}
				
				this.$store.commit('overlay', true);
				var form = new FormData();
				form.append("email", this.email);
				form.append("password", this.password);
				form.append("password_confirmation", this.confirmPassword);

				AuthService.register(form)
				.then((response) => {
					this.$store.commit("overlay", false);
					if (response.data && response.data.success) {
						alert(response.data.message);
						router.push('/login');
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
			goToLoginPage() {
				router.push('/login');
			}
		}
	};
</script>