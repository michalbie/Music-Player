<template>
    <section id="sidebar-container">
        <div class="sidebar-header">Playlists</div>
        <section id="playlists-list-container">
            <div class="sidebar-element" v-for="playlist in getPlaylists" :key="playlist.playlistName" @click="showPlaylist">
                {{ playlist.playlistName }}
            </div>
        </section>
        <div class="sidebar-header">Albums</div>
        <section id="albums-list-container">
            <div class="sidebar-element" v-for="album in getAlbums" @click="getAlbumData" :key="album">{{ album }}</div>
        </section>
    </section>
</template>

<script>
export default {
    name: "Sidebar",
    computed: {
        getAlbums() {
            return this.$store.state.albums;
        },
        getPlaylists() {
            return this.$store.state.playlists;
        }
    },
    methods: {
        getAlbumData: function(e) {
            this.$store.dispatch({
                type: "getAlbumInfo",
                albumName: e.target.innerHTML
            });
        },
        showPlaylist: function(e) {
            let files = [];
            let albumName = "";

            this.$store.state.playlists.forEach(el => {
                let playlistName = decodeURIComponent(el.playlistName);
                let targetName = e.target.innerHTML.replace(/\s/g, ""); //innerHTML contains spaces - I delete them

                if (playlistName == targetName) {
                    files = el["files"];
                    albumName = e.target.innerHTML;
                }
            });

            this.$store.dispatch({
                type: "showPlaylist",
                albumName: albumName,
                files: files
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./styles/mixins.scss";

#sidebar-container {
    position: relative;
    height: 100vh;
    width: 22em;
    background: rgba(255, 255, 255, 0.2);
    font-family: "Ubuntu", sans-serif;

    @include w1120 {
        display: none;
    }

    @include w1024P {
        display: none;
    }

    .sidebar-header {
        color: white;
        width: 100%;
        padding: 1em 1em 0 1rem;
        font-size: 1.7em;
        margin-left: 1.2rem;
    }

    .sidebar-element {
        color: rgba(255, 255, 255, 0.863);
        width: 100%;
        margin: 0.6em 1em 0 1rem;
        font-size: 1.3em;
        margin-left: 1.7em;
    }

    .sidebar-element:hover {
        cursor: pointer;
    }
}
</style>
