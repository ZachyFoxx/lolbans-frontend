<template>
    <v-app id="inspire">
        <router-view class="mb-5" />
    </v-app>
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
            items: [
                { text: "Punishments", route: "/punishments/" },
                { text: "Statistics", route: "/" }
            ],
            currentUser: [],
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
                    // Delete the token from Axios so requests fail.
                    delete axios.defaults.headers.common["Authorization"];
                    // Delete it from the local store as well.
                    localStorage.removeItem("user-token");
                    // Redirect out this bitch.
                    this.$router.replace({ name: "/" });
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
                this.$router.push({ name: "home" });
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
                } else this.$router.push({ name: "home" }).catch(function() {});
            } else this.$router.push({ name: "home" }).catch(function() {});
        }
    },
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUsername", "GetRealName"])
    }
};
</script>
<style lang="css">
a.v-btn--active {
    border-bottom: 5px solid var(--v-primary-base);
}
</style>
