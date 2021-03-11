<template>
	<div class="song-bar-wrapper">
        <p class="song-title">{{this.songTitle}}</p>
        <div class="song-data-container">
            <p class="album-name">{{this.albumName}}</p>
            <p class="song-size">{{this.size}} MB</p>
        </div>
	</div>
</template>

<script>
	export default {
		name: "SongBar",
		props: ["songTitle", "albumName", "size"],
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

        .song-data-container{
            display:flex;
            justify-content: space-around;
            width: 50%;

            .album-name{
                color: black;
                opacity: 50%;
            }

            .song-size{

            }
        }
    }
</style>
