<template>
    <section id="albums-section">
        <h1 id="albums-header">Albums</h1>
        <vue-perfect-scrollbar v-if="!isMobile" id="covers-section" ref="scrollbarContainer">
            <album-cover v-for="album in getAlbums" :key="album" :cover-src="getCover(album)" :album-name="album"></album-cover>
        </vue-perfect-scrollbar>
        <section v-else id="covers-section" ref="scrollbarContainer">
            <album-cover v-for="album in getAlbums" :key="album" :cover-src="getCover(album)" :album-name="album"></album-cover>
        </section>
    </section>
</template>

<script>
import AlbumCover from "./AlbumCover.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
    name: "AlbumsContainer",
    data() {
        return {
            isDeviceMobile: this.getDeviceType()
        };
    },
    methods: {
        getCover: function(albumName) {
            return this.$store.state.covers[albumName];
        },
        getDeviceType: function() {
            var is_mobile = /Mobile|iPhone|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)
                ? true
                : false;

            return is_mobile;
        }
    },
    computed: {
        getAlbums() {
            return this.$store.state.albums;
        },
        isMobile() {
            var is_mobile = /Mobile|iPhone|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)
                ? true
                : false;

            return is_mobile;
        }
    },
    components: {
        "album-cover": AlbumCover,
        "vue-perfect-scrollbar": VuePerfectScrollbar
    },
    updated: function() {
        this.$nextTick(function() {
            if (this.isDeviceMobile == false) {
                const scrollbar = this.$refs.scrollbarContainer.$el.querySelector(".ps__rail-x");
                scrollbar.style.backgroundColor = "transparent";
                scrollbar.querySelector(".ps__thumb-x").style.backgroundColor = "#2b2836";
            }
        });
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

$left-padding: 0.8em;

#albums-section {
    font-family: "Ubuntu", sans-serif;
    font-size: 26px;
    margin-left: $left-padding;
    padding-top: 0.8em;

    #albums-header {
        @include h500 {
            display: none;
        }

        @include w767P {
            font-size: 1.2em;
        }
    }
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
