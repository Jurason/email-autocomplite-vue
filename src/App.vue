
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
				<button @click="addContent('name')" class="button-small">NAME</button>
				<button @click="addContent('email')" class="button-small">EMAIL</button>
				<button @click="addContent('phone')" class="button-small">PHONE</button>
				<button @click="addContent('website')" class="button-small">WEBSITE</button>
			</div>
			<div ref="textarea" class="editable-input" contenteditable="true"></div>
		</div>
		<div class="template">
			<div class="header">
				<button @click="saveToLocalStorage" class="button-big save-to-local-storage">Save to LocalStorage</button>
				<button @click="addFromLocalStorage" class="button-big download-fromL-local-storage">Load from LocalStorage</button>
			</div>
			<div class="textarea">
				<div class="editable-input" ref="template" name="" id="" cols="30" rows="10"></div>
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
			currentClient: {
				name: '',
				email: '',
				phone: '',
				website: '',
			}
		}
	},
	mounted(){
		this.setSelectionToEnd(this.$refs.textarea)
		this.loadRandomClient()
		this.$refs.textarea.addEventListener('input', this.updateTemplate)
		window.addEventListener('click', this.updateTemplate)
	},
	beforeUnmount() {
		this.$refs.textarea.removeEventListener('input', this.updateTemplate)
		window.removeEventListener('click', this.updateTemplate)
	},
	computed: {

	},
	methods: {
		saveToLocalStorage(){
			localStorage.setItem('autocomplete-email', JSON.stringify(this.$refs.template.innerHTML))
		},
		addFromLocalStorage(){
			const dataFromLocalStorage = localStorage.getItem('autocomplete-email')
			if(dataFromLocalStorage){
				this.$refs.template.innerHTML = JSON.parse(dataFromLocalStorage)
			}
			this.updateContentFromTemplate()
		},
		async loadRandomClient(){
			const response = await loadUser()
			Object.keys(this.currentClient).forEach(key => {
				this.currentClient[key] = response[key]
			})
			this.updateContentFromServer()
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
		updateContentFromServer(){
			const name = this.$refs.textarea.querySelectorAll('[data-id="name"]')
			const email = this.$refs.textarea.querySelectorAll('[data-id="email"]')
			const phone = this.$refs.textarea.querySelectorAll('[data-id="phone"]')
			const website = this.$refs.textarea.querySelectorAll('[data-id="website"]')
			if(name){
				name.forEach(n => n.innerText = this.currentClient.name)
			}
			if(email){
				email.forEach(n => n.innerText = this.currentClient.email)
			}
			if(phone){
				phone.forEach(n => n.innerText = this.currentClient.phone)
			}
			if(website){
				website.forEach(n => n.innerText = this.currentClient.website)
			}
		},
		updateTemplate(){
			this.$refs.template.innerHTML = this.$refs.textarea.innerHTML
			this.$refs.template.childNodes.forEach(child => {
					child.textContent = `[[${child.dataset.id}]]`
				})
		},
		updateContentFromTemplate(){
			this.$refs.textarea.innerHTML = this.$refs.template.innerHTML
			this.$refs.textarea.childNodes.forEach(child => {
				child.textContent = this.currentClient[`${child.dataset.id}`]
			})
			this.setSelectionToEnd(this.$refs.textarea)
		},
		addContent(content){
			const element = document.createElement('span')
			element.textContent = this.currentClient[content]
			element.setAttribute('data-id', `${content}`)
			this.$refs.textarea.appendChild(element)
			this.setSelectionToEnd(this.$refs.textarea)
		},
	},
}
</script>

<style>
	@import "style.css";
</style>