<template>
	<div class="album-cover-wrapper">
		<img class="cover-img" :src="getCoverSrc" />
	</div>
</template>

<script>
	export default {
		name: "AlbumCover",
		props: ["coverSrc"],
		computed: {
			getCoverSrc() {
				console.log(this.coverSrc);
				return this.coverSrc;
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.album-cover-wrapper {
	}

	.cover-img {
		width: 10em;
		height: auto;
	}
</style>
