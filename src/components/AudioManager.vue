<template>
	<audio id="audio-manager" controls>
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
                document.getElementById("audio").pause();
                document.getElementById("audio").load();
                document.getElementById("audio").play();
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
