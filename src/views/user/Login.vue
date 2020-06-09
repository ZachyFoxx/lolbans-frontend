<template>
    <div>
        <div style="width: 100%; height: 100%; position: relative">
            <div
                style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"
            >
                <v-img
                    position="center bottom"
                    min-height="100vh"
                    src="/static/img/minecraft.png"
                />
            </div>
        </div>
        <div
            style="position: absolute; top: 25%; left: 0px; width: 100%; height: 500px"
        >
            <v-content>
                <v-container fluid>
                    <v-row fill-height align="center" justify="center">
                        <v-col cols="6" md="3" sm="3" xs="3">
                            <CardBase light color="success" class="px-5 py-3">
                                <template v-slot:heading>
                                    <div
                                        class="normal-2 font-weight-bold"
                                        align="center"
                                    >
                                        Login
                                    </div>
                                    <div
                                        class="display-1 my-2 font-weight-light"
                                        align="center"
                                    >
                                        <v-btn icon
                                            ><v-icon>mdi-discord</v-icon></v-btn
                                        >
                                        <v-btn icon
                                            ><v-icon
                                                >mdi-minecraft</v-icon
                                            ></v-btn
                                        >
                                    </div>
                                </template>
                                <div align="center" class="font-weight-thin">
                                    Or login here
                                </div>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field
                                            label="Username"
                                            name="login"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            v-model="input.username"
                                        />

                                        <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="input.password"
                                            v-on:keyup.enter="login()"
                                        />
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="login()"
                                        >Login</v-btn
                                    >
                                </v-card-actions>
                            </CardBase>
                        </v-col>
                    </v-row>
                </v-container>
            </v-content>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

import requests from "../../utils/requests";
import MaterialCard from "../../components/base/MaterialStatsCard.vue";
import CardBase from "../../components/base/MaterialCard.vue";

export default {
    props: {
        source: String
    },
    components: {
        materialcard: MaterialCard,
        CardBase: CardBase
    },
    data() {
        return {
            dark: null,
            input: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        login() {
            if (this.input.username != "" && this.input.password != "") {
                requests
                    .post("/user/login/", {
                        params: {
                            username: this.input.username,
                            password: this.input.password
                        }
                    })
                    .then(response => {
                        // TODO: Fix the username being their realname
                        this.$store.commit("SetUserInfo", {
                            token: response.data.Token,
                            Username: response.data.Username,
                            RealName: response.data.RealName
                        });
                        this.dialog = true;
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "index" });
                    })
                    .catch(error => {
                        // TODO: Make this show an error.
                        console.log(error);
                        this.$store.commit("ClearUserInfo");
                    })
                    .finally(() => {
                        // Clear the user's credentials for security
                        this.input.password = null;
                        this.input.username = null;
                    });
            }
        },
        LogOut() {
            // First, invalidate our token with Django
            requests
                .post("/user/logout/")
                .then(response => {
                    // Now invalidate everything inside of vue.
                    this.$store.commit("ClearUserInfo");
                    // Delete the token from Axios so requests fail.
                    delete requests.defaults.headers.common["Authorization"];
                    // Delete it from the local store as well.
                    localStorage.removeItem("user-token");
                    // Redirect out this bitch.
                    this.$router.replace({ name: "index" });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleClose() {
            this.dialog = false;
        }
    },
    mounted() {
        if (localStorage.getItem("dark", null) != null) {
            var info = localStorage.getItem("dark") == "true";
            if (info) {
                this.dark = true;
            } else {
                this.dark = false;
            }
        }
    },
    watch: {
        dark: function() {
            if (this.dark) {
                this.$vuetify.theme.dark = true;
                localStorage.setItem("dark", true);
            } else {
                this.$vuetify.theme.dark = false;
                localStorage.setItem("dark", false);
            }
        },
        search(val) {
            // Items have already been loaded
            if (val != "" && val != null) {
                this.isLoading = true;

                requests
                    .get("/search/", {
                        params: { query: val }
                    })
                    .then(response => {
                        this.searchitems = response.data.results;
                    })
                    .catch(error => {
                        alert(error);
                    })
                    .finally(() => (this.isLoading = false));
            } else {
                this.selected = [];
                this.$router.push({ name: "index" });
            }
        },
        selected(val) {
            if (val != undefined) {
                var selectedItem = null;
                this.searchitems.forEach(item => {
                    if (item.UUID == val) selectedItem = item;
                });

                if (selectedItem != null) {
                    this.$router.push({
                        name: "user",
                        params: { uuid: selectedItem.UUID }
                    });
                } else
                    this.$router.push({ name: "index" }).catch(function() {});
            } else this.$router.push({ name: "index" }).catch(function() {});
        }
    },
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUsername", "GetRealName"])
    }
};
</script>

<style>
.apexcharts-tooltip {
    background: #313131;
    color: black;
}

.apexcharts-toolbar {
    color: black;
}
</style>
