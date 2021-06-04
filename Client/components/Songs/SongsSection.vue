<template>
    <section id="songs-section">
        <h1 id="tracks-header">Tracks</h1>
        <vue-perfect-scrollbar v-if="!isMobile" id="overflow-wrapper" ref="scrollbarContainer">
            <div v-if="isInfoUpdated" id="songs-wrapper">
                <song-bar
                    v-for="name in this.$store.state.songs"
                    :album-name="$store.state.currentAlbum"
                    :song-title="name.file"
                    :size="name.size"
                    :key="name.file"
                ></song-bar>
            </div>
            <h1 v-else id="not-found-info">No tracks found</h1>
        </vue-perfect-scrollbar>
        <section v-else id="overflow-wrapper" ref="scrollbarContainer">
            <div v-if="isInfoUpdated" id="songs-wrapper">
                <song-bar
                    v-for="name in this.$store.state.songs"
                    :album-name="$store.state.currentAlbum"
                    :song-title="name.file"
                    :size="name.size"
                    :key="name.file"
                ></song-bar>
            </div>
            <h1 v-else id="not-found-info">No tracks found</h1>
        </section>
    </section>
</template>

<script>
import SongBar from "./SongBar.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

/**/

export default {
    name: "SongsSection",
    data() {
        return {
            songNames: this.$store.state.songs,
            currentAlbum: this.$store.state.currentAlbum,
            isDeviceMobile: this.getDeviceType()
        };
    },
    computed: {
        isInfoUpdated() {
            if (this.$store.state.songs.length > 0 && this.$store.state.currentAlbum) {
                return true;
            } else {
                return false;
            }
        },
        isMobile() {
            var is_mobile = /Mobile|iPhone|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)
                ? true
                : false;

            return is_mobile;
        }
    },
    methods: {
        getDeviceType: function() {
            var is_mobile = /Mobile|iPhone|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)
                ? true
                : false;

            return is_mobile;
        }
    },
    components: {
        "song-bar": SongBar,
        "vue-perfect-scrollbar": VuePerfectScrollbar
    },
    watch: {
        isInfoUpdated() {
            //console.log(`info updated`)
        }
    },
    updated: function() {
        this.$nextTick(function() {
            console.log(this.isDeviceMobile);
            if (this.isDeviceMobile == false) {
                const scrollbar = this.$refs.scrollbarContainer.$el.querySelector(".ps__rail-y");
                scrollbar.style.backgroundColor = "transparent";
                scrollbar.querySelector(".ps__thumb-y").style.backgroundColor = "#2b2836";
            } else {
                this.$refs.scrollbarContainer.style.overflow = "hidden";
                this.$refs.scrollbarContainer.querySelector("#songs-wrapper").style.overflow = "auto";
                this.$refs.scrollbarContainer.querySelector("#songs-wrapper").style.height = "100%";
            }
        });
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";
$left-padding: 0.8em;

#songs-section {
    font-family: "Ubuntu", sans-serif;
    font-size: 26px;
    margin-left: $left-padding;
    padding-top: 0.8em;
    padding-bottom: 5em;
    overflow: hidden;

    @include h500 {
        padding-bottom: 3em;
    }

    @include w767P {
        padding-top: 0;
    }

    @include w480P {
        padding-bottom: 7em;
    }

    #tracks-header {
        @include h500 {
            display: none;
        }

        @include w767P {
            font-size: 1.2em;
        }
    }

    #overflow-wrapper {
        height: 100%;

        #songs-wrapper {
            display: flex;
            flex-direction: column;
            margin-bottom: 0.5em;
        }

        #not-found-info {
            color: #2b2836;
            font-size: 1em;
        }
    }
}
</style>
