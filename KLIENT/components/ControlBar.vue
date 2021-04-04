<template>
	<div id="control-bar-container">
        <section id="music-control-panel">
            <img class="panel-controls" id="previous-control" src="../assets/previous-control.png" @click="previousSong">
            <img v-if="isPlaying" class="panel-controls" id="play-control" src="../assets/pause-control.png" @click="pauseSong">
            <img v-else class="panel-controls" id="play-control" src="../assets/play-control.png" @click="playSong">
            <img class="panel-controls" id="next-control" src="../assets/next-control.png" @click="nextSong">
        </section>
        <section id="info-section">
            <p v-if="isCurrentSong">{{this.$store.state.currentSongPlaying}}</p>
            <p v-else>Select track</p>
        </section>

        <!-- <p id="current-time-info">{{this.getCurrentTime()}}</p> -->
        <section id="progress-info-container" >
            <div class="time-info" id="current-time-info">00:00</div>
            <section id="progress-bar-container" @mousedown="beginSettingTime">
                <div id="song-length-base"></div>
                <div id="song-length-current"></div>
            </section>
            <div class="time-info" id="duration-time-info">-.-</div>
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
            isCurrentSong(){
                return this.$store.state.currentSongPlaying ? true : false;
            }
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
                let songs = this.$store.state.playingAlbumSongs;
                let currentIndex = null;
                let found = false;
                songs.forEach(element => {
                    if(element.file == this.getSongName){
                        currentIndex = songs.indexOf(element);
                        found = true;
                    }
                });

                //if track was removed while being played it cannot be found (return index 0 in this case)
                if (found){
                    return currentIndex;
                } else {
                    return 0;
                }
            },

            nextSong: function(){
                if(!this.$store.state.currentSongPlaying) return

                let songs = this.$store.state.playingAlbumSongs;
                let currentIndex = this.getCurrentSongIndex();
                let albumName = this.getAlbumName;

                console.log("currentAlbumPlaying: " + this.$store.state.currentAlbumPlaying)
                if(currentIndex != songs.length-1){
                    //if it is a playlist, assign albumName individually for every song (instead of one for all songs)
                    if(this.$store.state.isPlaylistPlaying == true){
                        this.$store.state.playlists.forEach(el => {
                            for(let i = 0; i < el["files"].length; i++){
                                if( el["files"][i].file == songs[currentIndex+1].file){
                                    albumName = el["files"][i].albumName
                                }
                            }
                        })
                    }

                    this.$store.dispatch({
                        type:"playSong",
                        songName: songs[currentIndex+1].file,
                        albumName: albumName}
                    );
                }
            },
            
            previousSong: function(){
                if(!this.$store.state.currentSongPlaying) return

                let songs = this.$store.state.playingAlbumSongs;
                let currentIndex = this.getCurrentSongIndex();
                let albumName = this.getAlbumName;

                if(currentIndex != 0){
                    //if it is a playlist, assign albumName individually for every song (instead of one for all songs)
                    if(this.$store.state.isPlaylistPlaying == true){
                        this.$store.state.playlists.forEach(el => {
                            for(let i = 0; i < el["files"].length; i++){
                                if( el["files"][i].file == songs[currentIndex-1].file){
                                    albumName = el["files"][i].albumName
                                }
                            }
                        })
                    }
                
                    this.$store.dispatch({
                        type:"playSong",
                        songName: songs[currentIndex - 1].file,
                        albumName: albumName}
                    );
                }
            },

            setNewTime: function(e){
                console.log("newTime")
                let time = (e.layerX / document.getElementById("song-length-base").offsetWidth) * document.getElementById("audio").duration;
                document.getElementById("audio").currentTime = time;
                this.updateCurrentTimeUI();
            },

            updateCurrentTimeUI: function(){
                let timeInSeconds = document.getElementById("audio").currentTime;
                let minutes = (timeInSeconds / 60).toFixed(0).toString().padStart(2, "0");
                let seconds = (timeInSeconds % 60).toFixed(0).toString().padStart(2, "0");
                document.getElementById("current-time-info").innerHTML = `${minutes}:${seconds}`;
            },

            //this function handles dragging progress bar current time position
            beginSettingTime: function(e){
                this.setNewTime(e)

                let newTimeWrapper = (event) => this.setNewTime(event);
                e.target.addEventListener("mousemove", newTimeWrapper)
                window.addEventListener("mouseup", () => {
                    e.target.removeEventListener("mousemove", newTimeWrapper)
                })
            },

            getCurrentTime: function(){
                let current = document.getElementById("audio").currentTime;
                return current;
            }
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
        align-items: center;

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
            padding: 0 1em 0 0;
            width: 20em;
        }

        #progress-info-container{
            height: 0.5em;
            width:50em;
            display: flex;
            align-items: center;

            .time-info{
                color: white;
                width: 3.5em;
                //text-align: center;
                align-items: center;
                padding: 0 0.5em 0 0.5em;
            }

            #progress-bar-container{
                position: relative;
                width: 50em;
                height: 0.5em;
                //background-color: red;
                //padding: 1em 0 1em 0;
                display: flex;
                align-items: center;

                #song-length-base{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: #5a5a5a;
                    opacity: 30%;
                }

                #song-length-current{
                    position: absolute;
                    height: 100%;
                    background-color: #ffffff;
                    opacity: 30%;
                }
            }

            #progress-bar-container:hover{
                cursor: pointer;
            }
        }
    }
</style>
