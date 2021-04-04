import axios from "axios";

const actions = {
    getFirstInfo({ commit }) {
        const obj = { body: { action: "FIRST" }, header: "application/json" };
        axios.post("http://localhost:3000/getMusicStructure", JSON.stringify(obj)).then(response => {
            commit("FIRST_INFO_MUTATION", response.data);
        });
    },
    getAlbumInfo({ commit }, data) {
        const obj = {
            body: { action: "NEXT", albumName: data.albumName },
            header: "application/json"
        };
        axios.post("http://localhost:3000/getMusicStructure", JSON.stringify(obj)).then(response => {
            commit("CURRENT_ALBUM_MUTATION", { ...response.data, albumName: data.albumName });
        });
    },
    getCovers({ commit }) {
        const obj = { body: { action: "GET_COVERS" }, header: "application/json" };

        const fetchData = async () => {
            let resp = await fetch(`http://localhost:3000/getMusicStructure`, {
                method: "post",
                mode: "cors",
                body: JSON.stringify(obj)
            });

            if (!resp.ok) return resp.status;
            else {
                let response = await resp.json();
                let covers = {};

                Object.keys(response).forEach(async album => {
                    let base64String = btoa(
                        String.fromCharCode(...new Uint8Array(response[album].data)) //found on stack overflow xd Array of bytes to Base64String
                    );
                    covers[album] = "data:image/png;base64," + base64String;
                });
                commit("COVERS_MUTATION", covers);
            }
        };

        fetchData();
    },

    getPlaylists({ commit }) {
        const obj = { body: { action: "GET_PLAYLISTS" }, header: "application/json" };
        axios.post("http://localhost:3000/getPlaylists", JSON.stringify(obj)).then(response => {
            commit("PLAYLISTS_MUTATION", response.data);
        });
    },

    showPlaylist({ commit }, data) {
        console.log("DATA: " + data.albumName + data.files);
        commit("CURRENT_ALBUM_MUTATION", data);
    },

    playSong({ commit }, data) {
        console.log("PLAY SONG ACTION");
        commit("CURRENT_SONG_MUTATION", { songName: data.songName, albumName: data.albumName });
        commit("PLAYING_STATE_MUTATION", true);
    },

    pauseSong({ commit }) {
        console.log("PAUSE SONG ACTION");
        document.getElementById("audio").pause();
        commit("PLAYING_STATE_MUTATION", false);
    },

    addSongToPlaylist({ commit }, data) {
        const obj = { body: { action: "ADD_TO_PLAYLIST", songData: data }, header: "application/json" };
        axios.post("http://localhost:3000/modifyPlaylist", JSON.stringify(obj)).then(response => {
            if (response.data == "Duplication Error") {
                alert("Error. This playlist already contains chosen track");
            } else {
                commit("PLAYLISTS_MUTATION", response.data);
                alert("Track added");
            }
        });
    },

    removeSongFromPlaylist({ commit, dispatch, state }, data) {
        const obj = { body: { action: "REMOVE_FROM_PLAYLIST", songData: data }, header: "application/json" };
        axios.post("http://localhost:3000/modifyPlaylist", JSON.stringify(obj)).then(response => {
            if (response.data == "Nonexisting Error") {
                alert("Error. Chosen track not found");
            } else {
                commit("PLAYLISTS_MUTATION", response.data);

                //get playlist songs
                let files = [];
                state.playlists.forEach(el => {
                    if (el.playlistName == data.playlistName) {
                        files = el["files"];
                    }
                });

                //update song list
                if (state.isPlaylistPlaying) {
                    state.playingAlbumSongs = files;
                    state.songs = files;
                }

                //re-render UI
                dispatch({
                    type: "showPlaylist",
                    albumName: data.playlistName,
                    files: files
                });
            }
        });
    }
};

export default actions;
