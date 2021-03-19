<template>
	<div class="song-bar-wrapper">
        <div style="display: flex; flex: 1;">
            <img v-if="isCurrentlyPlaying" class="play-btn" src="../../assets/pause.png" @click="pauseSong" />
            <img v-else class="play-btn" src="../../assets/play.png" @click="playSong"/>
            <p class="song-title">{{this.songTitle}}</p>
        </div>
        
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
            getSongTitle(){ //cos tu zmienialem
                return this.songTitle
            },
            getAlbumName(){
                return this.$store.state.currentAlbum;
            },
            isCurrentlyPlaying(){
                if(this.$store.state.currentSongPlaying == this.songTitle && this.$store.state.isPlaying == true){
                    return true;
                }
                return false;
            }
        },
        methods: {
            playSong: function(){
                this.$store.dispatch({
                    type:"playSong",
                    songName: this.songTitle,
                    albumName: this.albumName}
                );
            },
            pauseSong: function(event){
                this.$store.dispatch("pauseSong");
                event.target.src = "../../assets/play.png";
            }
        }
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

        .play-btn{
            width: 1em;
            height: auto;
            transition: all 0.5s ease;
        }

        .play-btn:hover{
            cursor: pointer;
            transform: scale(1.1);
        }

        .song-title{
            margin-left: 0.5em;
        }

        .song-data-container{
            display:flex;
            justify-content: space-around;
            width: 50%;

            .album-name{
                color: #2b2836;
            }

            .song-size{

            }
        }
    }
</style>
