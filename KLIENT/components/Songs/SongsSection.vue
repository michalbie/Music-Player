<template>
    <section id="songs-section">
        <h1>Tracks</h1>
        <vue-perfect-scrollbar id="overflow-wrapper" ref="scrollbarContainer">
            <div v-if="isInfoUpdated" id="songs-wrapper">
                <song-bar
                    v-for="name in this.$store.state.songs"
                    :album-name="$store.state.currentAlbum"
                    :song-title="name.file"
                    :size="name.size"
                    :key="name.file"
                ></song-bar>
            </div>
            <h1 v-else id="not-found-info">Nie znaleziono</h1>
        </vue-perfect-scrollbar>
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
            currentAlbum: this.$store.state.currentAlbum
        };
    },
    computed: {
        isInfoUpdated() {
            if (this.$store.state.songs.length > 0 && this.$store.state.currentAlbum) {
                return true;
            } else {
                return false;
            }
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
    mounted: function() {
        this.$nextTick(function() {
            const scrollbar = this.$refs.scrollbarContainer.$el.querySelector(".ps__rail-y");
            scrollbar.style.backgroundColor = "transparent";
            scrollbar.querySelector(".ps__thumb-y").style.backgroundColor = "#2b2836";
        });
    }
};
</script>

<style lang="scss" scoped>
$left-padding: 0.8em;

#songs-section {
    font-family: "Ubuntu", sans-serif;
    font-size: 26px;
    margin-left: $left-padding;
    padding-top: 0.8em;
    padding-bottom: 5em;
    overflow: hidden;

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
