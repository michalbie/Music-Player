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
    CURRENT_SONG_MUTATION(state, data) {
        console.log(data);
        state.currentAlbumPlaying = data.albumName;
        state.currentSongPlaying = data.songName;
    },
    PLAYING_STATE_MUTATION(state, data) {
        state.isPlaying = data;
    }
};

export default mutations;
