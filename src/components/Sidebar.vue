<template>
	<section id="sidebar-container">
		<div class="sidebar-header">Playlists</div>
		<section id="playlists-list-container">
			<div class="sidebar-element" 
				v-for="playlist in getPlaylists"
                :key="playlist.playlistName" 
                @click="showPlaylist">{{playlist.playlistName}}</div>
		</section>
		<div class="sidebar-header">Albums</div>
		<section id="albums-list-container">
			<div class="sidebar-element" 
				v-for="album in getAlbums"
                :key="album"
                >{{album}}</div>
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
			getPlaylists(){
				return this.$store.state.playlists;
			}
		},
		methods: {
			getAlbumData: function(){
				this.$store.dispatch({
					type: 'getAlbumInfo', 
					albumName: this.albumName,
				})
			},
			showPlaylist: function(e){
				let files = [];
				let albumName = "";

				this.$store.state.playlists.forEach(el => {
					if(el.playlistName == e.target.innerHTML){
						files = el["files"];
						albumName = e.target.innerHTML
					}
				})
				this.$store.dispatch({
					type: 'showPlaylist', 
					albumName: albumName,
					files: files,
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	#sidebar-container{
        position: relative;
        height: 100vh;
        width: 22em;
        background: rgba(255, 255, 255, 0.2);
		font-family: 'Ubuntu', sans-serif;
	
		.sidebar-header{
			color: white;
			width: 100%;
			padding: 1em 1em 0 1rem;
			font-size: 1.5em;
		}

		.sidebar-element{
			color: rgba(255, 255, 255, 0.863);
			width: 100%;
			margin: 0.5em 1em 0 1rem;
			font-size: 1.15em;
		}

		.sidebar-element:hover{
			cursor: pointer;
		}
    }

</style>
