<template>
    <div>
        <p class="font-weight-bold">E-Mail Address</p>
        <p>Add or update your email address for account recovery</p>
        <p>
            <span class="font-weight-bold">Current Email</span>:
            {{ email.curemail }}
        </p>

        <v-btn color="primary" outlined @click="email.show = true">
            <v-icon class="mr-2">fa-edit</v-icon>
            Update Email
        </v-btn>
        <v-dialog v-model="email.show" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span>Edit E-Mail</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                label="New E-Mail"
                                v-model="email.newemail"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Confirm New E-Mail"
                                v-model="email.confirm"
                                :color="email.isvalid"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                v-model="email.password"
                                required
                                type="password"
                            ></v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="email.show = false"
                        >Close</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="ChangeEmail()"
                        >Save</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import requests from "../../../utils/requests";

export default {
    name: "EmailChange",
    props: [],
    data: () => ({
        email: {
            curemail: null,
            newemail: null,
            confirm: null,
            password: null,
            isvalid: false,
            show: false
        }
    }),
    methods: {
        ChangeEmail() {
            // TODO: Maybe tell the user they're retarded?
            if (this.email.newemail != this.email.confirm) return;

            requests
                .post("/user/updateemail/", {
                    params: {
                        email: this.email.confirm,
                        passwd: this.email.password
                    }
                })
                .then(response => {
                    this.email.curemail = this.email.confirm;
                    this.email.show = false;
                })
                .catch(err => {
                    // TODO: Handle this better.
                    if (err.status_code == 401) {
                        //alert(err.response.error);
                    }
                })
                .finally(() => {
                    this.email.password = null;
                });
        }
    },
    watch: {
        "email.confirm": function(val) {
            if (val != null || val != "") {
                if (val == this.email.newemail) this.email.isvalid = "green";
                else this.email.isvalid = "red";
            }
        }
    },
    mounted() {
        // Populate the user info crap
        requests
            .get("/user/info/")
            .then(res => {
                var u = res.data;
                this.email.curemail = u.email;
                this.username = u.Username;
            })
            .catch(err => {
                console.log(err);
                alert(err);
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
