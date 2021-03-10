const mutations = {
	FIRST_INFO_MUTATION(state, data) {
		state.albums = data.dirs;
		state.songs = data.files;
	},
	CURRENT_ALBUM_MUTATION(state, data) {
		state.songs = data.files;
	},
	COVERS_MUTATION(state, data) {
		state.covers = data;
		console.log(state.covers, "STATE COVERS");
	},
};

export default mutations;
