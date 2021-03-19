<template>
	<div id="control-bar-container">
        <section id="music-control-panel">
            <img class="panel-controls" id="previous-control" src="../assets/previous-control.png" @click="previousSong">
            <img v-if="isPlaying" class="panel-controls" id="play-control" src="../assets/pause-control.png" @click="pauseSong">
            <img v-else class="panel-controls" id="play-control" src="../assets/play-control.png" @click="playSong">
            <img class="panel-controls" id="next-control" src="../assets/next-control.png" @click="nextSong">
        </section>
        <section id="info-section">
            <p>{{this.$store.state.currentSongPlaying}}</p>
        </section>
	</div>
</template>

<script>

	export default {
		name: "ControlBar",
        computed: {
            isPlaying(){
                return this.$store.state.isPlaying == true ? true : false;
            },
            getSongName(){
                return this.$store.state.currentSongPlaying;
            },
            getAlbumName(){
                return this.$store.state.currentAlbumPlaying;
            },
        },
        methods: {
            playSong: function(){
                if(this.$store.state.currentSongPlaying){
                    this.$store.dispatch({
                        type:"playSong",
                        songName: this.getSongName,
                        albumName: this.getAlbumName}
                    );
                }
            },

            pauseSong: function(event){
                this.$store.dispatch("pauseSong");
                event.target.src = "../../assets/play.png";
            },

            getCurrentSongIndex: function(){
                let songs = this.$store.state.songs;
                let currentIndex = null;
                songs.forEach(element => {
                    if(element.file == this.getSongName){
                        currentIndex = songs.indexOf(element);
                    }
                });
                return currentIndex;
            },

            nextSong: function(){
                if(!this.$store.state.currentSongPlaying) return

                let songs = this.$store.state.songs;
                let currentIndex = this.getCurrentSongIndex();
                if(currentIndex != songs.length-1){
                    this.$store.dispatch({
                        type:"playSong",
                        songName: songs[currentIndex+1].file,
                        albumName: this.getAlbumName}
                    );
                }
            },
            previousSong: function(){
                if(!this.$store.state.currentSongPlaying) return

                let songs = this.$store.state.songs;
                let currentIndex = this.getCurrentSongIndex();
                if(currentIndex != 0){
                    this.$store.dispatch({
                        type:"playSong",
                        songName: songs[currentIndex - 1].file,
                        albumName: this.getAlbumName}
                    );
                }
            },
        },
        watch: {
            isPlaying(){}
        }
	};
</script>

<style lang="scss" scoped>
    #control-bar-container{
        position: absolute;
        bottom: 0;
        display: flex;
        background-color: #2b2836;
        width: 100vw;
        height: 4em;
        z-index: 20;
        font-family: 'Ubuntu', sans-serif;

        #music-control-panel{
            display: flex;
            position: relative;
            align-items: center;
            padding: 0 1em 0 1em;

            .panel-controls{
                width: 1.2em;
                height: 1.2em;
                margin-right: 1em;
            }

            .panel-controls:hover{
                cursor: pointer;
            }

            #play-control{
                width: 2.5em;
                height: 2.5em;
                transition: all 0.5s ease;
            }
            
            #play-control:hover{
                cursor: pointer;
                transform: scale(0.95);
            }
        }

        #info-section{
            display: flex;
            align-items: center;
            color: white;
        }
    }
</style>
