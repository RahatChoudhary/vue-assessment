<template>
	<div>
		<v-row no-gutters class="pa-2">
			<v-col cols="6">
				<h1>{{toDo.id > 0 ? 'Update ToDo' : 'Create ToDo'}}</h1>
			</v-col>
			<v-col cols="6">
				<v-btn
					color="primary"
					md
					depressed
					style="float:right"
					@click="createUpdateToDoItem()"
				>
					{{toDo.id > 0 ? 'Update' : 'Create'}}
				</v-btn>
				<v-btn
					color="orange darken-2"
					class="mr-1"
					md
					depressed
					style="float:right"
					dark
					@click="goBack()"
				>
					<v-icon
						dark
						left
					>
						mdi-arrow-left
					</v-icon>Back
				</v-btn>
			</v-col>
			<v-col
				cols=12
				md=12
				sm=12
				class="pa-0 pt-2"
			>
				<v-text-field
					v-model="toDo.title"
					dense
					outlined
					label="Title"
					hide-details
				></v-text-field>
			</v-col>
			<v-col
				cols=12
				md=12
				sm=12
				class="pa-0 pt-2"
			>
				<v-textarea
					v-model="toDo.description"
					dense
					outlined
					label="Description"
					rows=20
					hide-details
				></v-textarea>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import ToDoService from '../services/ToDoService';
	import router from "../routers";
	
	export default {
		data() {
			return {};
		},
		props: {
            toDo: {
				type: Object,
				required: true,
				default: null,
			},
		},
		methods: {
			validate(){
				if(!this.toDo.title){
					alert('Title Field Is Required!');
					return false;
				}
				if(!this.toDo.description){
					alert('Description Field Is Required!');
					return false;
				}
				return true;
			},
			createUpdateToDoItem(){
				var errorValidation = !this.validate();
				if (errorValidation) {
					return;
				}
				if(this.toDo.id && this.toDo.id > 0){
					this.updateToDo();
				} else {
					this.createToDo();	
				}
			},
			createToDo(){
				this.$store.commit("overlay", true);
				var form = new FormData();
				form.append("title", this.toDo.title);
				form.append("description", this.toDo.description);
				
				ToDoService.createToDoItems(form)
				.then((response) => {
					this.$store.commit("overlay", false);
					if (response.data && response.data.success) {
						alert('Successfully Inserted');
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
			updateToDo(){
				this.$store.commit("overlay", true);
				let params = JSON.stringify({
					"title": this.toDo.title,
					"description": this.toDo.description,
				});
				ToDoService.updateToDoItems(this.toDo.id, params)
				.then((response) => {
					this.$store.commit("overlay", false);
					console.log(response);
					if (response.data && response.data.success) {
						alert('Successfully Updated');
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
			goBack(){
				router.push('/');
			},
		},
		mounted() {},
		created: function(){}
	};
</script>