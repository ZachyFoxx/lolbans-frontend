<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer.model"
            clipped
            :permanent="$vuetify.breakpoint.mdAndUp"
            :expand-on-hover="$vuetify.breakpoint.mdAndUp"
            app
        >
            <v-list shaped>
                <v-list-group
                    v-for="item in drawer.items"
                    :key="item.action"
                    v-model="item.model"
                    :prepend-icon="item.icon"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="item.title"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        link
                        :to="subItem.path"
                        v-for="subItem in item.items"
                        :key="subItem.title"
                    >
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="subItem.title"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>

            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-chart-line-variant</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Analytics</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <v-scroll-x-transition>
                    <div>
                        <div class="d-flex justify-center">
                            <v-switch
                                prepend-icon="mdi-brightness-7"
                                v-model="dark"
                            ></v-switch>
                        </div>
                    </div>
                </v-scroll-x-transition>
            </template>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>LolBans</v-toolbar-title>
            <v-spacer />
            <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                class="hidden-sm-and-down"
            />
            <v-spacer />
            <div v-if="IsAuthenticated">
                <span>{{ GetRealName }}</span>
                <v-btn @click="LogOut()" icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-btn>
            </div>
            <v-btn
                v-else
                :icon="$vuetify.breakpoint.xsOnly"
                :text="!$vuetify.breakpoint.xsOnly"
            >
                <span>Login</span>
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col class="shrink">
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    :href="source"
                                    icon
                                    large
                                    target="_blank"
                                    v-on="on"
                                >
                                    <v-icon large>mdi-code-tags</v-icon>
                                </v-btn>
                            </template>
                            <span>Source</span>
                        </v-tooltip>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    icon
                                    large
                                    href="https://codepen.io/johnjleider/pen/bXNzZL"
                                    target="_blank"
                                    v-on="on"
                                >
                                    <v-icon large>mdi-codepen</v-icon>
                                </v-btn>
                            </template>
                            <span>Codepen</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

import requests from "../utils/requests";

export default {
    props: {
        source: String
    },

    data() {
        return {
            drawer: {
                model: null,
                items: [
                    {
                        action: "punishments",
                        title: "Punishments",
                        icon: "mdi-gavel",
                        model: true,
                        items: [
                            { title: "Bans", path: "/punishments/bans" },
                            { title: "Mutes", path: "/punishments/mutes" },
                            {
                                title: "Warnings",
                                path: "/punishments/warnings"
                            },
                            { title: "Kicks", path: "/punishments/kicks" },
                            { title: "Reports", path: "/punishments/reports" }
                        ]
                    }
                ]
            },
            dark: false
        };
    },
    filters: {
        expiry: function(date) {
            if (date != null)
                return moment(date).format("MMM D YYYY, HH:mm UTC");
            else return "Indefinite";
        },
        acknowledged: function(acknowledged) {
            return acknowledged ? "Yes" : "No";
        },
        expired: function(date) {
            if (moment.utc(date).isAfter(moment().utc())) return "(Expired)";
        },
        formatdate: function(date) {
            if (date != null)
                return moment(date).format("MMM D YYYY, HH:mm UTC");
            else return "Unknown";
        }
    },
    methods: {
        Light() {
            return this.$vuetify.theme.dark;
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
        GetAvatarURL(uuid) {
            return "https://crafatar.com/avatars/" + uuid + "?size=32";
        },
        LogOut() {
            // First, invalidate our token with Django
            requests
                .post("/user/logout/")
                .then(response => {
                    // Now invalidate everything inside of vue.
                    this.$store.commit("ClearUserInfo");
                    // Redirect out this bitch.
                    this.$router.replace({
                        name: "/"
                    });
                })
                .catch(error => {
                    console.log(error);
                });
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
        }
    },
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUsername", "GetRealName"])
    }
};
</script>
