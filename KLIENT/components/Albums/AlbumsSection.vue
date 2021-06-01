<template>
    <section id="albums-section">
        <h1>Albums</h1>
        <vue-perfect-scrollbar id="covers-section" ref="scrollbarContainer">
            <album-cover v-for="album in getAlbums" :key="album" :cover-src="getCover(album)" :album-name="album"></album-cover>
        </vue-perfect-scrollbar>
    </section>
</template>

<script>
import AlbumCover from "./AlbumCover.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
    name: "AlbumsContainer",
    methods: {
        getCover: function(albumName) {
            return this.$store.state.covers[albumName];
        }
    },
    computed: {
        getAlbums() {
            return this.$store.state.albums;
        }
    },
    components: {
        "album-cover": AlbumCover,
        "vue-perfect-scrollbar": VuePerfectScrollbar
    },
    mounted: function() {
        this.$nextTick(function() {
            const scrollbar = this.$refs.scrollbarContainer.$el.querySelector(".ps__rail-x");
            scrollbar.style.backgroundColor = "transparent";
            scrollbar.querySelector(".ps__thumb-x").style.backgroundColor = "#2b2836";
        });
    }
};
</script>

<style lang="scss" scoped>
$left-padding: 0.8em;

#albums-section {
    font-family: "Ubuntu", sans-serif;
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
