<template>
	<section class="popup-container">
        <div>Select existing playlist</div>
		<section class="existing-playlists-container">
            <div class="existing-playlist-choice" v-for="playlist in getPlaylistsList" :key="playlist.playlistName" @click="addToPlaylist">{{playlist.playlistName}}</div>
        </section>
	</section>
</template>

<script>
	export default {
		name: "PlaylistsChoicePopup",
        props: ["songTitle", "albumName", "size"],
		computed: {
            getPlaylistsList(){
                return this.$store.state.playlists;
            }
        },
        methods: {
            addToPlaylist: function(e){
                this.$el.style.display = "none";
                this.$store.dispatch({
                    type:"addSongToPlaylist",
                    songName: this.songTitle,
                    albumName: this.albumName,
                    size: this.size,
                    playlistName: e.target.innerHTML
                });
            }
        }
	};
</script>

<style lang="scss" scoped>
	.popup-container {
        position: absolute;
        width: 12em;
        height: 100px;
        display: none;
        flex-direction: column;
        background-color: #2b2836;
        top: 2.15rem;
        left: 2.15rem;
        transition: all 0.5s ease;
        z-index: 30;
        border-radius: 0.5rem;
        padding: 0.5rem;
        font-size: 0.7em;
        color: white;

        .existing-playlists-container{
            overflow-y: auto;
            width: 100%;
            font-size: 0.9em;
            margin-top: 0.3em;

            .existing-playlist-choice{
                color: rgb(184, 184, 184);
            }
            
            .existing-playlist-choice:hover{
                cursor: pointer;
                opacity: 50%;
            }
        }
    }

</style>
