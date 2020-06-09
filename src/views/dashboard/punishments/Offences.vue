<template>
    <div v-if="PunishStats != null">
        <v-col cols="12" align="center">
            <v-alert text color="primary"
                >The dashboard is still in development, some features may not be
                available</v-alert
            >
        </v-col>
        <v-row class="">
            <v-col cols="12" md="6" sm="6" lg="3" xs="">
                <materialcard
                    color="error"
                    icon="mdi-gavel"
                    title="Bans"
                    :value="PunishStats.BanStats.TotalBans"
                    :smallValue="'(%' + PunishStats.BanStats.PercentTotal + ')'"
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="error"
                    icon="mdi-voice-off"
                    title="Mutes"
                    :value="PunishStats.MuteStats.TotalMutes"
                    :smallValue="
                        '(%' + PunishStats.MuteStats.PercentTotal + ')'
                    "
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="warning"
                    icon="mdi-account-alert"
                    title="Kicks"
                    :value="PunishStats.KickStats.Kicks"
                    :smallValue="
                        '(%' + PunishStats.KickStats.PercentTotal + ')'
                    "
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="warning"
                    icon="mdi-comment-alert"
                    title="Warnings"
                    :value="PunishStats.WarnStats.Warns"
                    :smallValue="
                        '(%' + PunishStats.WarnStats.PercentTotal + ')'
                    "
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>

            <v-col class="my-12" cols="12" md="6">
                <CardBase color="error" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Bans
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            All bans permanent or temporary will appear here
                        </div>
                    </template>
                    <v-card-text>
                        <v-data-table :headers="headers2" :items="items2" />
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col class="my-12" cols="12" md="6">
                <CardBase color="error" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Mutes
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            All mutes permanent or temporary will appear here
                        </div>
                    </template>
                    <v-card-text>
                        <v-data-table :headers="headers2" :items="items2" />
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col cols="12" md="6">
                <CardBase color="warning" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Kicks
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            All kicks will appear here
                        </div>
                    </template>
                    <v-card-text>
                        <v-data-table :headers="headers2" :items="items2" />
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col cols="12" md="6">
                <CardBase color="warning" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Warnings
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            All warnings acknowledged or not will appear here
                        </div>
                    </template>
                    <v-card-text>
                        <v-data-table :headers="headers2" :items="items2" />
                    </v-card-text>
                </CardBase>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import Maps from "vue-world-map";
import Charts from "vue-apexcharts";

import requests from "../../../utils/requests";
import MaterialCard from "../../../components/base/MaterialStatsCard.vue";
import CardBase from "../../../components/base/MaterialCard.vue";

export default {
    name: "DashAnalytics",
    components: {
        materialcard: MaterialCard,
        CardBase: CardBase,
        mapchart: Maps,
        apexchart: Charts
    },
    data: () => ({
        labels: ["Sun", "Mon", "Tue", "Wen", "Thru", "Fri", "Sat"],
        value: [200, 675, 410, 390, 310, 460, 250],
        geodata: {
            US: 10,
            CA: 6,
            UK: 5,
            RU: 9
        },
        PunishStats: [],
        banhead: [],
        bandata: [],
        mutehead: [],
        mutedata: [],
        warnhead: [],
        warndata: [],
        kickhead: [],
        kickdata: []
    }),
    methods: {
        GetPunishStats() {
            this.loadingQuery = true;
            requests
                .get("/statistics/")
                .then(response => {
                    console.log(response.data);
                    this.PunishStats = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
            this.loadingQuery = false;
        },
        query() {
            requests
                .get("/punishments")
                .then(response => {
                    this.pundata = response.data.results;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => (this.show = false));
        }
    },
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUserToken", "GetUsername"])
    },
    mounted() {
        this.query();
        this.GetPunishStats();
    }
};
</script>

<style></style>
