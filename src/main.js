import Vue from "vue";
import App from "./App.vue";
import vuex from "./store/index";
import Vuex from "vuex";

Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
	store: vuex,
	render: (h) => h(App),
	beforeMount() {
		this.$store.dispatch("getCovers");
	},
	mounted() {
		this.$store.dispatch("getFirstInfo");
	},
}).$mount("#app");

//TODO add possibility for cover to be png data:png for img
