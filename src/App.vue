<template>
	<div class="wrapper">
		<div class="left-block">
			<form class="left-block" action="./api.js">
				<button class="button-big add-random-client">Load random client</button>
				<div>Client name:</div>
				<input type="text">
				<div>Email address:</div>
				<input type="text">
				<div>Phone number:</div>
				<input type="text">
				<div>Main website:</div>
				<input type="text">
			</form>
		</div>
		<div class="textarea">
			<div class="header">Add token: &nbsp;
				<button class="button-small"><a href="">NAME</a></button>
				<button class="button-small"><a href="">EMAIL</a></button>
				<button class="button-small"><a href="">PHONE</a></button>
				<button class="button-small"><a href="">WEBSITE</a></button>
			</div>
			<textarea class="text-field" name="" id="" cols="30" rows="10"></textarea>
		</div>

		<div class="template">
			<div class="header">
				<button class="button-big download-fromL-local-storage">Load from LocalStorage</button>
				<button class="button-big save-to-local-storage">Save to LocalStorage</button>
			</div>
			<div class="textarea">
				<textarea class="text-field" name="" id="" cols="30" rows="10"></textarea>
			</div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
	* {
		box-sizing: border-box;
	}
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-areas:
				"lb text"
				"lb temp";
		border: 4px solid rgba(201, 196, 148, 0.99);;
		border-radius: 15px;
		padding: 10px;
		background-color: darkgrey;

	}
	.left-block {
		grid-area: lb;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 90%;
		padding: 20px;
	}
	input {
		height: 30px;
		width: 90%;
		background: rgba(201, 196, 148, 0.99);
	}
	textarea {
		background: rgba(201, 196, 148, 0.99);
	}
	.textarea {
		grid-area: text;
		display: flex;
		flex-direction: column;
	}
	.text-field {
		padding: 20px;
	}
	.template {
		grid-area: temp;
		display: flex;
		flex-direction: column;
	}
	.header {
		text-align: left;
		margin: 15px;
	}
	.button-big {
		margin-right: 50px;
		padding: 10px;
		background-color: cornflowerblue;
		color: black;
		border-radius: 5px;
	}
	.button-small {
		margin-right: 20px;
		padding: 10px;
		background-color: brown;
		color: white;
		border-radius: 5px;
	}
	a {
		text-decoration: none;
		color: black;
	}
	.add-random-client {
		margin-left: 10%;
		margin-right: 10%;
	}
</style>