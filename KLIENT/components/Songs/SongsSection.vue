<template>
	<section id="songs-section">
        <h1>Tracks</h1>
		<div v-if="isInfoUpdated" id="songs-wrapper">
            <song-bar v-for="name in this.$store.state.songs" :album-name="$store.state.currentAlbum"  :song-title="name.file" :size="name.size" :key="name.file"></song-bar>
        </div>
        <h1 v-else id="not-found-info">Nie znaleziono</h1>
	</section>
</template>

<script>
    import SongBar from "./SongBar.vue"

	export default {
		name: "SongsSection",
        data() {
            return {
                songNames: this.$store.state.songs,
                currentAlbum: this.$store.state.currentAlbum,
            };
        },
        computed: {
            isInfoUpdated(){
                if(this.$store.state.songs.length > 0 && this.$store.state.currentAlbum){
                    return  true;
                } else {
                    return false;
                }
            }
        },
		components: {
            "song-bar": SongBar,
        },
        watch: {
            isInfoUpdated () {
                //console.log(`info updated`)
            }
        },
	};
</script>

<style lang="scss" scoped>
    $left-padding: 0.8em;

    #songs-section{
        font-family: 'Ubuntu', sans-serif;
        font-size: 26px;
        margin-left: $left-padding;
        padding-top: 0.8em;

        #songs-wrapper{
            display: flex;
            flex-direction: column;
            margin-top: 0.5em;
        }

        #not-found-info{
            color: #2b2836;
            font-size: 1em;
        }
    }

</style>
