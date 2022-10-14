
<template>
	<div class="wrapper">
		<div class="left-block">
				<button @click="loadRandomClient" class="button-big add-random-client">Load random client</button>
				<div>Client name:</div>
				<input :value="currentClient.name" type="text">
				<div>Email address:</div>
				<input :value="currentClient.email" type="text">
				<div>Phone number:</div>
				<input :value="currentClient.phone" type="text">
				<div>Main website:</div>
				<input :value="currentClient.website" type="text">
		</div>
		<div class="textarea">
			<div class="header">Add token: &nbsp;
				<button @click="addName" class="button-small">NAME</button>
				<button class="button-small">EMAIL</button>
				<button class="button-small">PHONE</button>
				<button class="button-small">WEBSITE</button>
				<button @click="test" class="button-small">TEST</button>
			</div>
			<div @input="recordInput" ref="textarea" class="editable-input" contenteditable="true"></div>
		</div>
		<div class="template">
			<div class="header">
				<button @click="saveToLocalStorage" class="button-big save-to-local-storage">Save to LocalStorage</button>
				<button @click="addFromLocalStorage" class="button-big download-fromL-local-storage">Load from LocalStorage</button>
			</div>
			<div class="textarea">
				<textarea disabled v-model="currentText" class="text-field" name="" id="" cols="30" rows="10"></textarea>
			</div>
		</div>
	</div>
</template>

<script>
import { loadUser } from "./api";

export default {
  name: 'App',
  components: {

  },
	data() {
		return {
			currentText: '',

			currentClient: {
				name: '',
				email: '',
				phone: '',
				website: '',
			}
		}
	},
	mounted(){
		this.$refs.textarea.focus()
		this.loadRandomClient()

	},
	beforeUnmount() {

	},
	computed: {

	},
	methods: {
		saveToLocalStorage(){
			localStorage.setItem('autocomplete-email', JSON.stringify(this.currentText))
		},
		addFromLocalStorage(){
			const dataFromLocalStorage = localStorage.getItem('autocomplete-email')
			if(dataFromLocalStorage){
				this.currentText = JSON.parse(dataFromLocalStorage)
			}
		},
		async loadRandomClient(){
			const response = await loadUser()
			this.currentClient.name = response.name
			this.currentClient.email = response.email
			this.currentClient.phone = response.phone
			this.currentClient.website = response.website
			console.log('response:', response)
			this.updateContent()
		},
		recordInput(e){
			this.currentText = e.target.innerText
		},
		setSelectionToEnd(node){
			const selection = document.getSelection();
			const range = document.createRange();
			selection.removeAllRanges();
			range.selectNodeContents(node);
			range.collapse(false);
			selection.addRange(range);
			node.focus()
		},
		updateContent(){
			const test = document.querySelector('[data-id="name"]')
			test.innerText = this.currentClient.name
		},
		test(){

		},
		addName(){
			const testData = document.createElement('span')
			testData.textContent = this.currentClient.name
			testData.setAttribute('data-id', 'name')
			this.$refs.textarea.appendChild(testData)

			this.setSelectionToEnd(this.$refs.textarea)
		}



	},


}
</script>

<style>
	@import "style.css";
</style>