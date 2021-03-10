<template>
	<div class="album-cover-wrapper">
		<img class="cover-img" v-bind:src="getCoverSrc" />
	</div>
</template>

<script>
	export default {
		name: "AlbumCover",
		props: ["coverSrc"],
		computed: {
			getCoverSrc() {
				return this.coverSrc;
			},
		},
	};
</script>

<style lang="scss" scoped>
    $left-padding: 0.8em;

	.album-cover-wrapper {
		display: flex;
		align-items:center;
		justify-content: center;
		padding: 0.8em 0.8em 0.8em 0.2em;
	}

	.cover-img {
		width: 8em;
		height: auto;
		border-radius: 1em;
		box-shadow: 0 0 0.2em black;
		transition: all 0.5s ease;
	}

	.cover-img:hover{
		cursor: pointer;
		transform: scale(1.02)
	}

</style>
