<template>
	<div class="song-bar-wrapper">
        <p class="song-title">{{this.songTitle}}</p>
        <p class="album-name">{{this.albumName}}</p>
	</div>
</template>

<script>
	export default {
		name: "SongBar",
		props: ["songTitle", "albumName"],
        computed: {
            getSongTitle(){
                return this.$store.state.songs.file;
            },
            getAlbumName(){
                return this.$store.state.currentAlbum;
            }
        },
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.song-bar-wrapper{
        display: flex;
        justify-content: space-between;
        padding: 0.4em 0.6em 0.3em 0.4em;
        margin-top: 0.1em;
        background-color: rgba(10, 10, 10, 0.1);
        border-radius: 0.5em;

        .album-name{
            color: black;
            opacity: 50%;
        }
    }
</style>
