import Vue from "vue";
import App from "./App.vue";
import vuex from "./store/index";
import Vuex from "vuex";

Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
    store: vuex,
    render: h => h(App),
    beforeCreate() {
        this.$store.dispatch("getCovers");
        this.$store.dispatch("getFirstInfo");
        this.$store.dispatch("getPlaylists");
    }
}).$mount("#app");

