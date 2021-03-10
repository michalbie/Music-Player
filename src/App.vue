

<template>
	<div id="app">
		<div id="app-background" ></div>
		<div id="app-container">
			<sidebar></sidebar>
			<content-container></content-container>
		</div>
	</div>
</template>

<script>	
	import ContentContainer from "./components/ContentContainer.vue";
	import Sidebar from "./components/Sidebar.vue";

	export default {
		name: "App",
		components: {
			"content-container": ContentContainer,
			"sidebar": Sidebar,
		},
	};
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');

	.json-style {
		font-size: 15px;
	}

	* {
		margin: 0;
		padding: 0;
	}

	body {
		overflow: hidden;
	}

	#app {
		width: 100vw;
		height: 100vh;

		#app-container{
			display: flex;
			width: 100vw;
			height: 100vh;
		}

		#app-background{
			position: absolute;
			width: 100vw;
			height: 100vh;
			background-image: url("./assets/background.jpg");
			background-size: cover;
			background-repeat: no-repeat;
			position: absolute;
		}
	}

	
</style>
