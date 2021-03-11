<template>
	<div id="content-container">
        <albums-section></albums-section>
        <songs-section></songs-section>
	</div>
</template>

<script>
import AlbumsSection from './AlbumsSection.vue';
import SongsSection from './SongsSection.vue';

	export default {
		name: "ContentContainer",
        components: {
            "albums-section": AlbumsSection,
            "songs-section": SongsSection,
        }
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    #content-container{
        background-color: rgba(255,255,255,0.7);
        display: flex;
        flex-direction: column;
        flex: 1;
        z-index: 2;
        overflow: auto;
        position: relative;
    }

   

    
</style>
