import Vue from "vue";
import App from "./App.vue";
import vuex from "./store/index";
import Vuex from "vuex";

Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
	store: vuex,
	render: (h) => h(App),
	beforeCreate() {
		this.$store.dispatch("getCovers");
		this.$store.dispatch("getFirstInfo");
	},
	beforeMount() {},
	mounted() {
		//this.$store.dispatch("getFirstInfo");
	},
}).$mount("#app");

//TODO
//add possibility for cover to be png data:png for img
//add showing another album after click
//add showing size
//make responsiveness, change styles
