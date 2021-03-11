const mutations = {
	FIRST_INFO_MUTATION(state, data) {
		state.albums = data.dirs;
		state.songs = data.files;
		state.currentAlbum = data.dirs[0];
	},
	CURRENT_ALBUM_MUTATION(state, data) {
		state.songs = data.files;
		state.currentAlbum = data.albumName;
	},
	COVERS_MUTATION(state, data) {
		state.covers = data;
	},
};

export default mutations;
