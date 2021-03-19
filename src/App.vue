

<template>
	<div id="app">
		<div id="app-background" ></div>
		<div id="app-container">
			<sidebar></sidebar>
			<content-container></content-container>
		</div>
		<control-bar></control-bar>
		<audio-manager id="audio"></audio-manager>
	</div>
</template>

<script>	
	import ContentContainer from "./components/ContentContainer.vue";
	import Sidebar from "./components/Sidebar.vue";
	import AudioManager from "./components/AudioManager.vue";
	import ControlBar from "./components/ControlBar.vue";

	export default {
		name: "App",
		components: {
			"content-container": ContentContainer,
			"sidebar": Sidebar,
			"audio-manager": AudioManager,
			"control-bar": ControlBar,
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
		
		#app-background::before {
			background: url(./assets/background.jpg) 0 / cover fixed;
		}

		#app-background{
			position: absolute;
			width: 100vw;
			height: 100vh;
			/*background-image: url("./assets/background.jpg");
			background-size: cover;
			filter: blur(0px);*/
			transform:scale(1.06);
			background-repeat: no-repeat;
			position: absolute;
		}

		#app-background::before{
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			
			filter: blur(10px);
		}

		//^ ciekawy trik do paska
		// top: 0;
		// 	right: 0;
		// 	bottom: 200px;
		// 	left: 0;
	}

	
</style>
