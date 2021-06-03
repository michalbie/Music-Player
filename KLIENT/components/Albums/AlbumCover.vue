<template>
    <div class="album-cover-wrapper">
        <img class="cover-img" v-bind:src="getCoverSrc" @click="getAlbumData" />
    </div>
</template>

<script>
export default {
    name: "AlbumCover",
    props: ["coverSrc", "albumName", "isPlaylist"],
    computed: {
        getCoverSrc() {
            return this.coverSrc;
        }
    },
    methods: {
        getAlbumData: function() {
            if (!this.isPlaylist) {
                this.$store.dispatch({
                    type: "getAlbumInfo",
                    albumName: this.albumName
                });
            } else {
                let files = [];

                this.$store.state.playlists.forEach(el => {
                    let playlistName = decodeURIComponent(el.playlistName);
                    let targetName = this.albumName;

                    if (playlistName == targetName) {
                        files = el["files"];
                    }
                });

                this.$store.dispatch({
                    type: "showPlaylist",
                    albumName: this.albumName,
                    files: files
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";
$left-padding: 0.8em;

.album-cover-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8em 0.8em 0.8em 0.2em;

    @include h700 {
        padding: 0.5em 0.5em 0.5em 0.2em;
    }
}

.cover-img {
    width: 8em;
    height: 8em;
    border-radius: 1em;
    box-shadow: 0 0 0.2em black;
    transition: all 0.5s ease;

    @include h700 {
        width: 4em;
        height: 4em;
        border-radius: 0.5em;
    }

    @include w767P {
        width: 4em;
        height: 4em;
        border-radius: 0.5em;
    }
}

.cover-img:hover {
    cursor: pointer;
    transform: scale(1.02);

    @include h700 {
        transform: scale(1.1);
    }
}
</style>
