<template>
	<div id="control-bar-container">
        <section id="music-control-panel">
            
        </section>
	</div>
</template>

<script>
	export default {
		name: "ControlBar",
	};
</script>

<style lang="scss" scoped>
    #control-bar-container{
        position: absolute;
        bottom: 0;
        display: flex;
        background-color: #191927;
        width: 100vw;
        height: 4em;
        z-index: 20;
    }
</style>
