<template>
    <div>
        <v-dialog v-model="namesettings.show" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-row dense v-on="on" align="center">
                    <v-col cols="0">
                        <v-list-item-content style="padding: 0px">
                            <v-list-item-title class="font-weight-bold text--secondary" style="font-size: 12px;">NAME</v-list-item-title>
                        </v-list-item-content>
                    </v-col>

                    <v-col cols="0"> </v-col>

                    <v-col cols="3">
                        <v-list-item-content style="padding: 0px">
                            <v-list-item-title>{{ namesettings.RealName }}</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-col>

                    <v-col cols="1">
                        <v-list-item-content style="padding: 0px">
                            <v-list-item-title>
                                <span></span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-col>
                    <v-col class="text-right" cols="5">
                    <v-list-item-title>
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-col>
                </v-row>
            </template>
            <v-card>
                <v-card-title>
                    <span>Edit Profile Name</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                label="First Name"
                                v-model="namesettings.first"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Last Name"
                                v-model="namesettings.last"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="namesettings.show = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="ChangeName()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import requests from "../../../utils/requests";

export default {
	name: "NameChange",
	props: [],
	data: () => ({
        namesettings: {
            RealName: null,
            first: null,
            last: null,
            show: false,
        },
    }),
	methods: {
        ChangeName()
        {
            requests.post("/user/updatename/", {params: {firstname: this.namesettings.first, lastname: this.namesettings.last}})
                .then(response => {
                    this.namesettings.RealName = this.namesettings.first + " " + this.namesettings.last;
                    this.$store.commit("SetUserInfo", {
                        token: this.GetUserToken,
                        Username: this.GetUsername,
                        RealName: this.namesettings.RealName,
                    });

                    // TODO: Snackbar saying something happened?
                    this.namesettings.show = false;
                })
                .catch(err => {
                    alert(err);
                });
        },
    },
    mounted() 
    {
        // Populate the user info crap
        requests.get("/user/info/")
            .then(res => {
                var u = res.data;
                this.namesettings.first = u.FirstName;
                this.namesettings.last = u.LastName;
                this.namesettings.RealName = u.RealName;
            }).catch(err => {
                console.log(err);
                alert(err);
            }).finally(() => (this.show = false));
    }
};
</script>