import axios from "axios";

const actions = {
	getFirstInfo({ commit }) {
		const obj = { body: { action: "FIRST" }, header: "application/json" };
		axios
			.post("http://localhost:3000/getMusicStructure", JSON.stringify(obj))
			.then((response) => {
				commit("FIRST_INFO_MUTATION", response.data);
			});
	},
	getAlbumInfo({ commit }) {
		const obj = { body: { action: "NEXT" }, header: "application/json" };
		axios
			.post("http://localhost:3000/getMusicStructure", JSON.stringify(obj))
			.then((response) => {
				commit("CURRENT_ALBUM_MUTATION", response.data);
			});
	},
	getCovers({ commit }) {
		const obj = { body: { action: "GET_COVERS" }, header: "application/json" };

		const fetchData = async () => {
			let resp = await fetch(`http://localhost:3000/getMusicStructure`, {
				method: "post",
				mode: "cors",
				body: JSON.stringify(obj),
			});

			if (!resp.ok) return resp.status;
			else {
				let response = await resp.json();
				let covers = {};

				Object.keys(response).forEach(async (album) => {
					let base64String = btoa(
						String.fromCharCode(...new Uint8Array(response[album].data)) //found on stack overflow xd Array of bytes to Base64String
					);
					covers[album] = "data:image/jpeg;base64," + base64String;
				});
				commit("COVERS_MUTATION", covers);
			}
		};

		fetchData();
	},
};

export default actions;
