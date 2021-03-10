<template>
	<div id="content-container">
        <albums-section></albums-section>
	</div>
</template>

<script>
import AlbumsSection from './AlbumsSection.vue';
	export default {
		name: "ContentContainer",
        components: {
            "albums-section": AlbumsSection,
        }
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    #content-container{
        background-color: rgba(255,255,255,1);
        display: flex;
        flex-direction: column;
        flex: 1;
        z-index: 2;
        overflow: auto;
    }

    
</style>
