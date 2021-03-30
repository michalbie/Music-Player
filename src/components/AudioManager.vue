<template>
	<audio id="audio-manager" controls preload="metadata">
        <source :src="getUrl"
                id="audio_src"
                type="audio/mp3" />
    </audio>
</template>

<script>
	export default {
		name: "AudioManager",
        computed: {
            getUrl(){
                return `http://localhost:3000/mp3/${this.$store.state.currentAlbumPlaying}/${this.$store.state.currentSongPlaying}`
            },
            getPlayingState(){
                return this.$store.state.isPlaying;
            }
        },
        methods:{
            play: function(){
                let convertTimeToString = (timeInSeconds) => {
                    let minutes = (timeInSeconds / 60).toFixed(0).toString().padStart(2, "0");
                    let seconds = (timeInSeconds % 60).toFixed(0).toString().padStart(2, "0");
                    let string = `${minutes}:${seconds}`;
                    //console.log(timeInSeconds)
                    return string;
                }

                let audio = document.getElementById("audio");
                audio.pause();
                audio.load();
                
                audio.onloadeddata = function (e) {
                    audio.play();
                    
                    e.target.ontimeupdate = function (e) {
                        let newWidth = (e.target.currentTime / e.target.duration) * document.getElementById("song-length-base").offsetWidth;
                        document.getElementById("song-length-current").style.width = newWidth + "px";

                        let currentTimeInSeconds = document.getElementById("audio").currentTime;
                        document.getElementById("current-time-info").innerHTML = convertTimeToString(currentTimeInSeconds);
                    };
                };

                audio.onloadedmetadata = function() {
                    console.log("DURATION " + audio.duration)
                    let songTimeInSeconds = audio.duration;
                    document.getElementById("duration-time-info").innerHTML = convertTimeToString(songTimeInSeconds);
                };
            },
            pause: function(){
                document.getElementById("audio").pause();
            },
            resume: function(){
                document.getElementById("audio").play();
            }
        },
        watch:{
            getUrl(newUrl, oldUrl){
                console.log("New: " + newUrl, "Old: " + oldUrl);
                this.play();
            },
            getPlayingState(newState){
                if(newState == true){
                    this.resume();
                } else {
                    this.pause();
                }
            }
        },
        
	};
</script>

<style lang="scss" scoped>

</style>
