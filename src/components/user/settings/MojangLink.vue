<template>
    <div>
        <v-dialog v-model="mojang.show" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-row dense v-on="on" align="center">
                    <v-col cols="0">
                        <v-list-item-content style="padding: 0px">
                            <v-list-item-title class="font-weight-bold text--secondary" style="font-size: 12px;"
                                >Minecraft</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-col>

                    <v-col cols="0"> </v-col>

                    <v-col cols="3">
                        <v-list-item-content style="padding: 0px">
                            <v-list-item-title>NOT LINKED</v-list-item-title
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
                    <span>Link Minecraft Account</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form ref="form" lazy-validation>
                            <v-text-field
                                v-model="mojang.MinecraftName"
                                :counter="16"
                                :loading="mojang.isLoading"
                                label="Minecraft Username"
                                :append-icon="mojang.icon"
                                :color="mojang.color"
                                :error="mojang.error"
                                :error-messages="mojang.errormsg"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="mojang.show = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="LinkMinecraftAccount()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import requests from "../../../utils/requests";

export default {
	name: "MojangLink",
	props: [],
	data: () => ({
        mojang: {
            isLoading: false,
            MinecraftName: null,
            timer: null,
            color: null,
            icon: null,
            error: false,
            errormsg: null,
            show: false
            // mdi-close mdi-check
        },
    }),
	methods: {
        LinkMinecraftAccount()
        {
            // TODO: This whole function?
            this.mojang.show = false;
        },
    },
    watch: {
        'mojang.MinecraftName': function(val) 
        {
            // We use a timer so we don't spam mojang with search queries
            // while the user is typing, instead we wait for them to be done
            // then execute the query
            // clear error state
            this.mojang.error = false;
            this.mojang.errormsg = null;
            if (this.mojang.timer) {
                clearTimeout(this.mojang.timer);
                this.mojang.timer = null;
            }
            this.mojang.timer = setTimeout(() => {
                if (val != "" && val != null) 
                {
                    this.mojang.isLoading = true;

                    requests.get("/user/mojang/", {params: {username: val}})
                        .then(res => {
                            this.mojang.color = "green";
                        })
                        .catch(err => {
                            this.mojang.error = true;
                            this.mojang.errormsg = err.response.data.error;
                            this.mojang.color = "red";
                        })
                        .finally(() => (this.mojang.isLoading = false));
                }
            }, 800);
        },
    }
};
</script>