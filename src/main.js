import Vue from "vue";
import Vuex from "vuex";
import App from "./views/App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import requests from "./utils/requests";

Vue.use(Vuex);
// Configure whether to allow vue-devtools inspection
Vue.config.devtools = true;

// Enable component init, compile, render and patch performance tracing in the browser devtool timeline.
Vue.config.performance = true;

// Prevent the production tip on Vue startup.
Vue.config.productionTip = false;

// Suppress all Vue logs and warnings
Vue.config.silent = false;

const DEFAULT_TITLE = "LolBans";
router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

const store = new Vuex.Store({
    state: {
        UserToken: "",
        Username: "",
        RealName: "",
        Authentcated: false
    },
    getters: {
        GetUserToken: state => {
            return state.UserToken;
        },
        GetUsername: state => {
            return state.Username;
        },
        GetRealName: state => {
            return state.RealName;
        },
        IsAuthenticated: state => {
            return state.Authentcated;
        }
    },
    mutations: {
        SetUserInfo(state, authobj) {
            state.UserToken = authobj.token;
            state.Username = authobj.Username;
            state.RealName = authobj.RealName;
            state.Authentcated = true;
            // Set external things as well.
            localStorage.setItem("user-token", authobj.token);
            axios.defaults.headers.common["Authorization"] =
                "Token " + authobj.token;
        },
        ClearUserInfo(state) {
            state.UserToken = null;
            state.Username = null;
            state.RealName = null;
            state.Authentcated = false;
            // Set external things as well.
            localStorage.removeItem("user-token");
            delete axios.defaults.headers.common["Authorization"];
        }
    }
});

// Handle authentication past refreshes,
// this must be down here after vuex store
// is created, since vue technically doesn't
// exist yet in this context.
var token = localStorage.getItem("user-token");
if (token == null || token == "null" || token == "undefined")
    localStorage.removeItem("user-token");
else {
    requests.defaults.headers.common["Authorization"] = "Token " + token;

    // Now make an axios request for more user info so we are consistent
    // across browser refreshes.
    requests
        .get("/user/info/")
        .then(response => {
            store.commit("SetUserInfo", {
                token: response.data.Token,
                Username: response.data.Username,
                RealName: response.data.RealName
            });
        })
        .catch(error => {
            console.log(error);
        });
}
new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount("#app");
