<template>
    <div>
        <v-row>
            <v-col cols="6">
                <v-card elevation="1">
                    <v-card-text>
                        <h1 class="font-weight-bold" align="center">
                            Other Information
                        </h1>
                        <v-divider class="mt-4"></v-divider>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Language Selection</p>
                            <v-select
                                :items="languages"
                                v-model="currentLanguage"
                                label="Language"
                                outlined
                                @change="changeLanguage()"
                            ></v-select>

                            <p class="font-weight-bold">Theme Selection</p>
                            <v-switch
                                disabled
                                @click="Theme()"
                                v-model="dark"
                                label="Dark Mode"
                            ></v-switch>
                        </div>
                        <v-divider></v-divider>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Linked Accounts</p>
                            <p>Add or remove linked accounts</p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">mdi-plus-circle</v-icon>
                                Add New
                            </v-btn>
                            <v-data-table
                                :headers="headers"
                                :items="accounts"
                                :items-per-page="5"
                            >
                                <template v-slot:item.actions="{ item }">
                                    <v-icon
                                        small
                                        class="mr-2"
                                        @click="editItem(item)"
                                    >
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small @click="deleteItem(item)">
                                        mdi-delete
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </div>
                        <v-divider></v-divider>
                        <div class="mt-4 mb-4"></div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card elevation="1">
                    <v-card-text>
                        <h1 class="font-weight-bold" align="center">
                            Personal Information
                        </h1>
                        <v-divider class="mt-4"></v-divider>

                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Real Name</p>
                            <p>Update or add your real name</p>
                            <p>
                                <span class="font-weight-bold"
                                    >Current Name</span
                                >: {{ namesettings.RealName }}
                            </p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">fa-edit</v-icon>
                                Update Real Name
                            </v-btn>
                            <v-divider class="mt-4"></v-divider>
                        </div>

                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Username</p>
                            <p>Update your username</p>
                            <p>
                                <span class="font-weight-bold"
                                    >Current Username</span
                                >: {{ GetUsername }}
                            </p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">fa-edit</v-icon>
                                Update Username
                            </v-btn>
                            <v-divider class="mt-4"></v-divider>
                        </div>

                        <div class="mt-4 mb-4">
                            <EmailChange />
                        </div>

                        <v-divider class="mt-4"></v-divider>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Password</p>
                            <p>Update your password</p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">fa-edit</v-icon>
                                Update Password
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import requests from "../../../utils/requests";
import MojangLink from "../../../components/user/settings/MojangLink.vue";
import NameChange from "../../../components/user/settings/NameChange.vue";
import EmailChange from "../../../components/user/settings/EmailChange.vue";

export default {
    name: "UserSettings",
    components: {
        MojangLink: MojangLink,
        NameChange: NameChange,
        EmailChange: EmailChange
    },
    data: () => ({
        dark: null,
        show: true,
        dialog: false,
        selectedCursor: "pointer",
        username: null,

        namesettings: {
            RealName: null,
            first: null,
            last: null
        },
        passwd: {
            curpass: null,
            newpass: null,
            confirm: null,
            show: false
        },
        snackbar: {
            show: false,
            text: "thingy",
            timeout: 2000
        },
        languages: [
            { text: "English", value: "en" },
            { text: "Español", value: "es" }
        ],
        currentLanguage: "",
        headers: [
            {
                text: "Platform",
                align: "start",
                sortable: false,
                value: "platform"
            },
            { text: "Username", value: "username" },
            { text: "Date Linked", value: "datelinked" },
            { text: "Actions", value: "actions", sortable: false }
        ],
        accounts: [
            {
                platform: "Discord",
                username: "Zachery#0001",
                datelinked: "04-26-2020 15:43:20",
                datelinked: "04-26-2020 15:43:20"
            },
            {
                platform: "Minecraft",
                username: "NotZachery",
                datelinked: "04-26-2020 15:43:20"
            },
            {
                platform: "Minecraft",
                username: "KnotZachery",
                datelinked: "04-26-2020 15:43:20"
            }
        ]
    }),
    methods: {
        changeLanguage() {
            window.localStorage.setItem("app_language", this.currentLanguage);
            window.location.reload();
        },
        Theme() {
            if (localStorage.getItem("dark") == false) {
                this.$vuetify.theme.dark = true;
                localStorage.setItem("dark", true);
            } else {
                this.$vuetify.theme.dark = false;
                localStorage.setItem("dark", false);
            }
        },
        ChangePassword() {
            // TODO: Tell the user they're retarded.
            if (this.passwd.newpass != this.passwd.confirm) return;

            requests
                .post("/user/updatepasswd/", {
                    params: {
                        curpass: this.passwd.curpass,
                        passwd: this.passwd.confirm
                    }
                })
                .then(response => {
                    // TODO: Show a snackbar saying their password was updated??
                    this.passwd.show = false;
                })
                .catch(err => {
                    if (err.response.status == 400) {
                        // TODO: Handle `errors` array more cleanly
                        //alert(err.response.data.error);
                        //alert(err.response.data.errors);
                    }
                })
                .finally(() => {
                    this.passwd.newpass = null;
                    this.passwd.curpass = null;
                    this.passwd.confirm = null;
                });
        },
        handleClose() {
            this.dialog = false;
        }
    },
    watch: {
        "passwd.confirm": function(val) {
            if (val != null || val != "") {
                if (val == this.passwd.newpass) this.passwd.isvalid = "green";
                else this.passwd.isvalid = "red";
            }
        }
    },
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUserToken", "GetUsername"])
    },
    mounted() {
        this.dark = localStorage.getItem("dark");
        // Populate the user info crap
        requests
            .get("/user/info/")
            .then(res => {
                var u = res.data;
                this.namesettings.first = u.FirstName;
                this.namesettings.last = u.LastName;
                this.namesettings.RealName = u.RealName;
                this.username = u.Username;
            })
            .catch(err => {
                console.log(err);
                //alert(err);
                this.$router.replace({ name: "index" });
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
