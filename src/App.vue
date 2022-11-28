<template>
	<fullscreen ref="fullscreen" @change="fullscreenChange">
		<v-app>
			<v-navigation-drawer
				v-if="hide"
				:mini-variant.sync="miniDawer"
				permanent
				app
				dark
				color="#1e1e2d"
				:width="180"
			>
				<v-list dense>
					<v-list-item style="height: 55px">
						<v-list-item-action
							v-if="miniDawer"
						>
							<v-btn
								
								icon
								@click.stop="miniDawer = !miniDawer"
							>
								<v-icon>mdi-chevron-double-right</v-icon>
							</v-btn>
						</v-list-item-action>
						<v-list-item-title style="line-height: inherit">
							VUE Assessment
						</v-list-item-title>
						<v-btn
							icon
							@click.stop="miniDawer = !miniDawer"
						>
							<v-icon>mdi-chevron-double-left</v-icon>
						</v-btn>
					</v-list-item>
					<v-divider></v-divider>
					<v-list-item link to="/">
						<v-list-item-action>
							<v-icon>mdi-tooltip-edit</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>ToDo</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
			
			<v-app-bar
				v-if="hide"
				app
				color="#FFFFFF"
			>
				<!--<v-app-bar-nav-icon @click.stop="miniDawer = !miniDawer"></v-app-bar-nav-icon>-->
				<v-spacer></v-spacer>
				<v-btn icon @click="toggle()">
					<v-icon v-if="fullscreen">mdi-fullscreen-exit</v-icon>
					<v-icon v-else>mdi-fullscreen</v-icon>
				</v-btn>
				<v-btn icon @click="logout()">
					<v-icon>mdi-logout</v-icon>
				</v-btn>
			</v-app-bar>
			<v-main>
				<!-- Provides the application the proper gutter -->
				<!--<v-container fluid>-->
					<!-- If using vue-router -->
					<template>
						<router-view></router-view>
					</template>
				<!--</v-container>-->
			</v-main>
		</v-app>
		<v-overlay :value="$store.getters['overlay']">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</fullscreen>
</template>
<script>
	import Fullscreen from "vue-fullscreen/src/component.vue";
	import Cookie from "js-cookie";

	export default {
		components: {
			Fullscreen
		},
		mounted: function() {},
		data() {
			return {
				miniDawer: false,
				fullscreen: false
			};
		},
		computed: {
			hide () {
				if(this.$route.path === '/register' || this.$route.path === '/login'){
					return false;
				}else{
					let res = Cookie.get('token');
					if(res) {
						return true;
					} else {
						return !(this.$route.path === '/'); 
					}
				}
				
			}
		},
		methods: {
			toggle () {
				this.$refs['fullscreen'].toggle()
			},
			fullscreenChange (fullscreen) {
				this.fullscreen = fullscreen
			},
			logout () {
				this.$store.dispatch('logout');
			}
		}
	};
</script>
<style>
	.v-application--is-ltr .v-list-item__action:first-child {
		margin-right: 10px
	}
</style>