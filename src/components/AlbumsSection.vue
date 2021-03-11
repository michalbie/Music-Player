<template>
    <section id="albums-section">
        <h1>Albums</h1>
        <section id="covers-section">
            <album-cover
                v-for="album in getAlbums"
                :key="album"
                :cover-src="getCover(album)"
                :album-name="album"
            ></album-cover>
        </section>
    </section>
</template>

<script>
    import AlbumCover from "./AlbumCover.vue";

	export default {
		name: "AlbumsContainer",
		methods: {
			getCover: function(albumName) {
				return this.$store.state.covers[albumName];
			},
		},
        computed: {
			getAlbums() {
				return this.$store.state.albums;
			},
		},
        components: {
			"album-cover": AlbumCover,
		},
	};
</script>

<style lang="scss" scoped>
    $left-padding: 0.8em;

    #albums-section{
        font-family: 'Ubuntu', sans-serif;
        font-size: 26px;
        margin-left: $left-padding;
        padding-top: 0.8em;
    }

    #covers-section {
        display: flex;
        transition: all 1s ease-in;
        // flex-wrap: wrap;
        position: relative;
        z-index: 3;
        overflow-x: auto;
    }

</style>
