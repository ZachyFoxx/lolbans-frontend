<template>
    <div>
        <v-navigation-drawer
            v-model="drawer.model"
            :permanent="$vuetify.breakpoint.mdAndUp"
            clipped
            app
            overflow
        >
            <v-list-item style="height: 120px">
                <v-list-item-content
                    fill-height
                    justify="center"
                    align="center"
                >
                    <center>
                        <v-list-item-title class="title"
                            >RistEx Network<v-icon
                                >mdi-menu-down</v-icon
                            ></v-list-item-title
                        >
                        <v-list-item-subtitle>{{
                            email.curemail
                        }}</v-list-item-subtitle>
                    </center>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list shaped>
                <v-list-group
                    v-for="item in drawer.items"
                    :key="item.action"
                    v-model="item.active"
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
        </v-navigation-drawer>

        <v-content>
            <v-container fluid class="mb-5">
                <v-row align="center" justify="center">
                    <v-col cols="18" xs="14" sm="14" md="12" lg="10" xl="10">
                        <transition mode="out-in" name="fade">
                            <router-view />
                        </transition>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import requests from "../../utils/requests";

export default {
    name: "Dashboard",
    data: () => ({
        show: true,
        dialog: false,
        selectedCursor: "pointer",
        username: null,
        namesettings: {
            RealName: null,
            first: null,
            last: null
        },
        email: {
            curemail: null
        },
        snackbar: {
            show: false,
            text: "thingy",
            timeout: 2000
        },
        drawer: {
            model: null,
            items: [
                {
                    action: "dashboard",
                    title: "Punishments",
                    icon: "mdi-gavel",
                    active: true,
                    items: [
                        {
                            title: "Analytics",
                            path: "/dashboard/punishments/analytics"
                        },
                        {
                            title: "Appeals",
                            path: "/dashboard/punishments/appeals"
                        },
                        {
                            title: "Offences",
                            path: "/dashboard/punishments/offences"
                        },
                        {
                            title: "Reports",
                            path: "/dashboard/punishments/reports"
                        }
                    ]
                },
                {
                    action: "network",
                    title: "Networks",
                    icon: "mdi-server-network",
                    items: [{ title: "Manage", path: "/networks/manage" }]
                },
                {
                    action: "billing",
                    title: "Billing",
                    icon: "mdi-currency-usd",
                    items: [
                        { title: "Invoices", path: "/account/invoices" },
                        { title: "Plans", path: "/account/plan" }
                    ]
                }
            ]
        }
    }),
    methods: {},
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUserToken", "GetUsername"])
    },
    mounted() {
        // Populate the user info crap
        requests
            .get("/user/info/")
            .then(res => {
                var u = res.data;
                this.namesettings.first = u.FirstName;
                this.namesettings.last = u.LastName;
                this.namesettings.RealName = u.RealName;
                this.email.curemail = u.email;
                this.username = u.Username;
            })
            .catch(err => {
                console.log(err);
                //alert(err);
                //this.$router.replace({ name: "index" });
            })
            .finally(() => (this.show = false));
        let language = window.localStorage.getItem("app_language");
        if (language === null) {
            language = navigator.language;
            this.currentLanguage = "en";
        } else {
            this.currentLanguage = language;
        }
    }
};
</script>
