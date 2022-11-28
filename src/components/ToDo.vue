<template>
	<div>
		<v-row no-gutters class="pa-2">
			<v-col cols="6"><h1>ToDo Items</h1></v-col>
			<v-col cols="6">
				<v-btn
					color="primary"
					md
					depressed
					style="float:right"
					@click="createUpdateToDo()"
				>
					Create ToDo
				</v-btn>
			</v-col>
			<!-- <v-col cols="12">
				<v-infinite-scroll :loading="loading" @top="prevPage" @bottom="nextPage" :offset='20' style="max-height: 80vh; overflow-y: scroll;">
					<div v-for="(item, i) in toDoItems" :key="i">
						{{item.title}}
					</div>
					</v-infinite-scroll>
			</v-col> -->
			<v-col cols="12">
				<v-infinite-scroll
					:loading="loading"
					@top="prevPage"
					@bottom="nextPage"
					:offset='20' 
					style="max-height: 80vh;overflow-y: scroll;"
				>
					<v-expansion-panels
						v-model="panel"
						focusable
						multiple
						readonly
					>
						<v-expansion-panel
							v-for="(item,i) in toDoItems"
							:key="i"
						>
							<v-expansion-panel-header>
								{{item.title}}
								<template v-slot:actions>
									<v-icon
										color="warning"
										@click="editToDo(item)"
									>
										mdi-pencil
									</v-icon>
								</template>
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								{{item.description}}
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-infinite-scroll>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import router from "../routers";
	import ToDoService from "../services/ToDoService";
	
	export default {
		components: {},
		data() {
			return {
				panel: [],
				toDoItems: [],
				page: 1,
				loading: false,
			};
		},
		created: function(){},
		mounted() {
			this.getToDoItems();
		},
		methods: {
			prevPage () {},
			nextPage () {
				++this.page
				this.getToDoItems()
			},
			getToDoItems(){
				this.loading = true;
				setTimeout(() => {
					this.$store.commit("overlay", true);
					ToDoService.getToDoItems(this.page)
					.then((response) => {
						this.loading = false;
						this.$store.commit("overlay", false);
						if (response.data && response.data.success) {
							let items = response.data.items;
							this.totalPage = items.last_page;
							items.data.forEach(item => {
								this.toDoItems.push(item);	
							})
							this.panel = [...Array(items.total).keys()].map((k, i) => i)
						} else alert("No response return");
					})
					.catch((e) => {
						this.busy = false;
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
				}, 1000)
			},
			createUpdateToDo(){
				router.push({
					name: 'createUpdateToDo',
					params: {
						toDo: {
							"id": 0,
							"title": "",
							"description": "",
						}
					}
				});
			},
			editToDo(item){
				router.push({
					name: 'createUpdateToDo',
					params: {
						toDo: item
					}
				});
			},
		},
	};
</script>