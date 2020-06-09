<template>
    <div>
        <v-app-bar clipped-left app dark>
            <v-row align="center">
                <v-col cols="2" xs="2" sm="3" md="3">
                    <v-toolbar-title class="font-weight-bold">
                        <v-btn depressed>
                            <span v-if="$vuetify.breakpoint.smAndUp"
                                >LolBans</span
                            >
                            <v-icon v-if="!$vuetify.breakpoint.smAndUp"
                                >mdi-police-badge</v-icon
                            >
                        </v-btn>
                    </v-toolbar-title>
                </v-col>
                <v-col cols="8" xs="8" sm="6" md="6" align="center">
                    <v-autocomplete
                        :items="searchitems"
                        :loading="isLoading"
                        :search-input.sync="search"
                        auto-select-first
                        flat
                        hide-details
                        clearable
                        solo-inverted
                        v-model="selected"
                        item-text="PlayerName"
                        item-value="UUID"
                        prepend-inner-icon="mdi-magnify"
                        label="Search for a punishment"
                    >
                    </v-autocomplete>
                </v-col>
                <v-spacer />
                <div>
                    <template>
                        <v-btn v-if="IsAuthenticated" depressed>
                            <v-icon
                                class="ml-2"
                                v-if="!$vuetify.breakpoint.smAndUp"
                                >mdi-account</v-icon
                            >
                            <span
                                class="ml-2 "
                                v-if="$vuetify.breakpoint.smAndUp"
                                >{{ GetUsername }}</span
                            >
                        </v-btn>
                        <v-btn
                            v-if="!IsAuthenticated"
                            depressed
                            :to="{ name: 'login' }"
                        >
                            <v-icon v-if="!$vuetify.breakpoint.smAndUp"
                                >mdi-account-circle</v-icon
                            >
                            <span v-if="$vuetify.breakpoint.smAndUp"
                                >Login</span
                            >
                        </v-btn>
                    </template>
                </div>
            </v-row>
        </v-app-bar>

        <div style="width: 100%; height: 500px; position: relative">
            <div
                style="position: absolute; top: 0px; left: 0px; width: 100%; height: 500px"
            >
                <v-img
                    position="center bottom"
                    height="100%"
                    src="/static/img/minecraft.png"
                />
            </div>
            <div
                style="position: absolute; top: 0px; left: 0px; width: 100%; height: 500px"
            >
                <v-content>
                    <v-container fluid>
                        <v-row fill-height align="center" justify="center">
                            <v-col
                                fill-height
                                cols="12"
                                xs="12"
                                sm="12"
                                md="10"
                                lg="8"
                                xl="6"
                                align="center"
                                justify="center"
                            >
                                <div class="ma-12">
                                    <h1 class="title">LolBans (logo)</h1>
                                    <p class="title">
                                        An advanced punishment management system
                                    </p>
                                    <v-btn v-if="!IsAuthenticated" outlined
                                        >Get Started</v-btn
                                    >
                                    <v-btn
                                        v-if="IsAuthenticated"
                                        outlined
                                        :to="{ name: 'dashboard' }"
                                        >Go to dashboard</v-btn
                                    >
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-content>
            </div>
        </div>

        <v-container fluid>
            <v-row fill-height align="center" justify="center">
                <v-col
                    fill-height
                    cols="12"
                    xs="12"
                    sm="12"
                    md="10"
                    lg="8"
                    xl="6"
                    align="center"
                    justify="center"
                >
                    <v-row>
                        <v-col cols="4">
                            <v-icon large>mdi-web</v-icon>
                            <p style="margin-top: 20px; margin-bottom: 0px">
                                Global Punishments
                            </p>
                        </v-col>
                        <v-col cols="4">
                            <v-icon large>mdi-view-dashboard</v-icon>
                            <p style="margin-top: 20px; margin-bottom: 0px">
                                Powerful Dashboard
                            </p>
                        </v-col>
                        <v-col cols="4">
                            <v-icon large>mdi-chart-line-variant</v-icon>
                            <p style="margin-top: 20px; margin-bottom: 0px">
                                Punishment Statistics
                            </p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>

        <v-sheet tile>
            <v-container fluid>
                <v-row fill-height align="center" justify="center">
                    <v-col
                        fill-height
                        cols="12"
                        xs="12"
                        sm="12"
                        md="10"
                        lg="8"
                        xl="6"
                        align="center"
                        justify="center"
                    >
                        <v-row>
                            <v-col cols="6">
                                <h2 class="display-1">Punishment Management</h2>
                                <v-divider class="ma-4" />
                                <p class="font-weight-light text-left">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat. Duis aute irure
                                    dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </p>
                            </v-col>
                            <v-col cols="6">
                                <v-img
                                    position="center bottom"
                                    height="100%"
                                    src="/static/img/dashboard.png"
                                />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>

        <div style="width: 100%; height: 1500px; position: relative">
            <div
                style="position: absolute; top: 0px; left: 0px; width: 100%; height: 500px"
            >
                <v-content>
                    <v-container fluid>
                        <v-row fill-height align="center" justify="center">
                            <v-col
                                fill-height
                                cols="12"
                                xs="12"
                                sm="12"
                                md="10"
                                lg="8"
                                xl="6"
                                align="center"
                                justify="center"
                            >
                                <div>
                                    <h1 class="display-2">About Us</h1>
                                </div>
                                <v-divider class="ma-4" />
                                <div>
                                    <p class="font-weight-light">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>
                                </div>
                                <v-timeline>
                                    <v-timeline-item
                                        v-for="(year, i) in years"
                                        :key="i"
                                        :color="year.color"
                                        small
                                    >
                                        <template v-slot:opposite>
                                            <span
                                                :class="
                                                    `headline font-weight-bold ${year.color}--text`
                                                "
                                                v-text="year.year"
                                            ></span>
                                        </template>
                                        <div class="py-4">
                                            <h2
                                                :class="
                                                    `headline font-weight-light mb-4 ${year.color}--text`
                                                "
                                            >
                                                Lorem ipsum
                                            </h2>
                                            <div>
                                                Lorem ipsum dolor sit amet, no
                                                nam oblique veritus. Commune
                                                scaevola imperdiet nec ut, sed
                                                euismod convenire principes at.
                                                Est et nobis iisque percipit, an
                                                vim zril disputando
                                                voluptatibus, vix an salutandi
                                                sententiae.
                                            </div>
                                        </div>
                                    </v-timeline-item>
                                </v-timeline>
                                <h1 class="display-1">Today</h1>
                                <p class="font-weight-light">
                                    Lorem ipsum dolor sit amet, no nam oblique
                                    veritus. Commune scaevola imperdiet nec ut,
                                    sed euismod convenire principes at. Est et
                                    nobis iisque percipit, an vim zril
                                    disputando voluptatibus, vix an salutandi
                                    sententiae.
                                </p>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-content>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

import requests from "../utils/requests";
import LoginDialog from "../components/user/Login.vue";

export default {
    props: {
        source: String
    },
    components: {
        LoginDialog: LoginDialog
    },
    data() {
        return {
            searchitems: [],
            isLoading: false,
            search: null,
            selected: null,
            dialog: false,
            profileUserDialog: false,
            currentUser: [],
            dark: null,
            header: 0,
            games: [
                {
                    name: "Minecraft",
                    background: "/static/img/minecraft.jpg",
                    align: "center bottom"
                }
            ],
            years: [
                {
                    color: "cyan",
                    year: "November 2019"
                },
                {
                    color: "cyan",
                    year: "December 2019"
                },
                {
                    color: "cyan",
                    year: "March 2020"
                },
                {
                    color: "cyan",
                    year: "April 2020"
                },
                {
                    color: "cyan",
                    year: "May 2020"
                }
            ]
        };
    },
    methods: {
        Light() {
            return this.$vuetify.theme.dark;
        },
        Goto(page) {
            this.$router.push({ name: page }).catch(function() {});
        },
        Theme(num) {
            if (num == 0) {
                this.$vuetify.theme.dark = false;
                localStorage.setItem("dark", false);
            } else if (num == 1) {
                this.$vuetify.theme.dark = true;
                localStorage.setItem("dark", true);
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
        this.dark = true;
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
