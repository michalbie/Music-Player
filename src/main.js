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
    },
    beforeMount() {},
    mounted() {
        //this.$store.dispatch("getFirstInfo");
    }
}).$mount("#app");

//TODO
//add possibility for cover to be png data:png for img
//make responsiveness
//remove .mp3 postfix in code
//add playlists mechanism
//add default cover
//54w actions.js skonczylem
