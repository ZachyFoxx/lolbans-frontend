<template>
    <div>
        <v-row>
            <v-col>
                <h1 class="text-center">
                    RistEx Network - Punishments ({{ data.length }})
                </h1>
                <v-col class="mx-auto" xs="12" sm="12" md="10" lg="8" xl="8"
                    ><v-divider></v-divider
                ></v-col>
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col cols="6">
                                <div class="mb-3">
                                    <v-select
                                        :items="types"
                                        v-model="type"
                                        value="All Punishments"
                                        label="Punishment Type"
                                        outlined
                                    ></v-select>
                                </div>
                            </v-col>
                            <v-col cols="6" align="right">
                                <v-btn
                                    class="mr-4"
                                    color="primary"
                                    @click="downloadCsv"
                                    :disabled="data.length === 0"
                                    :loading="downloading"
                                    outlined
                                >
                                    <v-icon class="mr-2">fa-file-alt</v-icon>
                                    Download CSV
                                </v-btn>
                                <v-btn
                                    :loading="loadingQuery"
                                    color="primary"
                                    @click="query(type)"
                                    >Refresh
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            no-data-text="There are no punishments on record"
                            :headers="headers"
                            :items="data"
                            class="elevation-1"
                            :loading="loadingQuery"
                        >
                            <template v-slot:item.TimePunished="{ item }">
                                <span>{{
                                    item.TimePunished | formatdate
                                }}</span>
                            </template>
                            <template v-slot:item.PunishID="{ item }">
                                <span>#{{ item.PunishID }}</span>
                            </template>
                            <template v-slot:item.Expiry="{ item }">
                                <span>{{ item.Expiry | expiry }}</span>
                            </template>
                            <template v-slot:item.Type="{ item }">
                                <span>{{ item.Type | type }}</span>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import moment from "moment";
import Papa from "papaparse";

import requests from "../../../utils/requests";
import BanRow from "../../../components/punishments/offences/BanRow.vue";

export default {
    name: "bans",
    computed: {},
    components: {
        BanRow: BanRow
    },

    data() {
        return {
            table: "All",
            type: 4,
            show: true,
            BannedPlayers: null,
            BanHistory: null,
            pagination: {
                // URLs for the next pages
                BannedNext: null,
                HistoryNext: null
            },
            data: [],
            headers: [
                { text: "Punish ID", value: "PunishID" },
                { text: "Name", value: "PlayerName" },
                { text: "Reason", value: "Reason" },
                { text: "Time Punished", value: "TimePunished" },
                { text: "Expiry", value: "Expiry" },
                { text: "Type", value: "Type" }
            ],
            types: [0, 1, 2, 3, 4],
            downloading: false,
            loadingQuery: false
        };
    },
    filters: {
        expiry: function(date) {
            if (date != null)
                return moment(date).format("MM-DD-YYYY, HH:mm UTC");
            else return "Indefinite";
        },
        type: function(type) {
            if (type === 0) return "Ban";
            else if (type === 1) return "Mute";
            else if (type === 2) return "Kick";
            else if (type === 3) return "Warning";
            else return "Unknown";
        },
        expired: function(date) {
            if (moment.utc(date).isAfter(moment().utc())) return "(Expired)";
        },
        formatdate: function(date) {
            if (date != null)
                return moment(date).format("MM-DD-YYYY, HH:mm UTC");
            else return "Unknown";
        }
    },
    methods: {
        TableClick(type, player) {
            this.$router.push({
                name: "PunishDetails",
                params: { uuid: player.UUID }
            });
        },
        query(type) {
            if (type === 4) {
                this.loadingQuery = true;
                requests
                    .get("/punishments/")
                    .then(response => {
                        this.data = response.data;
                        this.loadingQuery = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.loadingQuery = true;
                requests
                    .get("/punishments/?type=" + type)
                    .then(response => {
                        this.data = response.data;
                        console.log(this.data);
                        this.loadingQuery = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        downloadCsv() {
            this.downloading = true;
            let csv = Papa.unparse(this.data);
            let csvData = new Blob([csv], { data: "text/csv;charset=utf-8;" });
            let csvURL = null;
            if (navigator.msSaveBlob) {
                csvURL = navigator.msSaveBlob(csvData, "download.csv");
            } else {
                csvURL = window.URL.createObjectURL(csvData);
            }
            let tempLink = document.createElement("a");
            tempLink.href = csvURL;
            tempLink.setAttribute("download", `LolBans.csv`);
            tempLink.click();
            this.downloading = false;
        },
        // When we intersect with something, check and see what next pages are available and load that data.
        OnHistoryIntersect(entries, observer) {
            // If we have gotten past the skeleton loader and reached the bottom of the list, do something.
            // TODO: What if there's only 1 ban or something?? Does this trigger forever?
            if (
                !this.show &&
                entries[0].intersectionRatio >= 0.5 &&
                this.pagination.HistoryNext != null
            ) {
                requests
                    .get(this.pagination.HistoryNext)
                    .then(response => {
                        for (var i = 0; i < response.data.results.length; ++i)
                            this.BanHistory.push(response.data.results[i]);

                        if (response.data.next != null)
                            this.pagination.HistoryNext = response.data.next;
                        else this.pagination.HistoryNext = null;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        OnBannedIntersect(entries, observer) {
            if (
                !this.show &&
                entries[0].intersectionRatio >= 0.5 &&
                this.pagination.BannedNext != null
            ) {
                requests
                    .get(this.pagination.BannedNext)
                    .then(response => {
                        for (var i = 0; i < response.data.results.length; ++i)
                            this.BannedPlayers.push(response.data.results[i]);

                        if (response.data.next != null)
                            this.pagination.BannedNext = response.data.next;
                        else this.pagination.BannedNext = null;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        GetAvatarURL(uuid) {
            if (uuid === "console") {
                return "/static/img/console.png";
            }
            return "https://crafatar.com/avatars/" + uuid + "?size=32";
        }
    },
    mounted() {
        this.query(this.type);
    }
};
</script>
