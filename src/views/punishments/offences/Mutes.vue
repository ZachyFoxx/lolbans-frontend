<template>
    <div>
        <v-expand-transition>
            <div v-show="show">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-skeleton-loader
                            v-for="i in 10"
                            style="margin-bottom: 10px"
                            height="68"
                            type="list-item-two-line"
                        ></v-skeleton-loader>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-skeleton-loader
                            v-for="i in 10"
                            style="margin-bottom: 10px"
                            height="68"
                            type="list-item-two-line"
                        ></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
        </v-expand-transition>

        <v-expand-transition>
            <div v-show="!show">
                <v-row>
                    <v-col cols="12" sm="6">
                        <h2>Active Mutes</h2>
                        <v-divider
                            style="margin-top: 20px; margin-bottom: 20px"
                        />
                        <MuteRow
                            v-for="player in ActiveMutes"
                            :key="player._id"
                            :Mute="player"
                            :Active="true"
                        />
                        <v-card
                            style="visibility: none;"
                            v-intersect.quiet="{
                                handler: OnMutedIntersect,
                                options: {
                                    threshold: [0, 0.5, 1.0]
                                }
                            }"
                        >
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h2>All Mutes</h2>
                        <v-divider
                            style="margin-top: 20px; margin-bottom: 20px"
                        />
                        <MuteRow
                            v-for="player in Mutes"
                            :key="player._id"
                            :Mute="player"
                            :Active="false"
                        />
                        <v-card
                            style="visibility: none;"
                            v-intersect.quiet="{
                                handler: OnHistoryIntersect,
                                options: {
                                    threshold: [0, 0.5, 1.0]
                                }
                            }"
                        >
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
import moment from "moment";

import requests from "../../../utils/requests";
import MuteRow from "../../../components/punishments/offences/MuteRow.vue";

export default {
    name: "Mutes",
    computed: {},
    components: {
        MuteRow: MuteRow
    },

    data() {
        return {
            show: true,
            ActiveMutes: null,
            Mutes: null,
            pagination: {
                // URLs for the next pages
                MutedNext: null,
                HistoryNext: null
            }
        };
    },
    filters: {
        expiry: function(date) {
            if (date != null)
                return moment(date).format("MMM D YYYY, HH:mm UTC");
            else return "Indefinite";
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
        // When we intersect with something, check and see what next pages are available and load that data.
        OnHistoryIntersect(entries, observer) {
            // If we have gotten past the skeleton loader and reached the bottom of the list, do something.
            // TODO: What if there's only 1 Mute or something?? Does this trigger forever?
            if (
                !this.show &&
                entries[0].intersectionRatio >= 0.5 &&
                this.pagination.HistoryNext != null
            ) {
                requests
                    .get(this.pagination.HistoryNext)
                    .then(response => {
                        for (var i = 0; i < response.data.results.length; ++i)
                            this.MuteHistory.push(response.data.results[i]);

                        if (response.data.next != null)
                            this.pagination.HistoryNext = response.data.next;
                        else this.pagination.HistoryNext = null;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        OnMutedIntersect(entries, observer) {
            if (
                !this.show &&
                entries[0].intersectionRatio >= 0.5 &&
                this.pagination.MutedNext != null
            ) {
                requests
                    .get(this.pagination.MutedNext)
                    .then(response => {
                        for (var i = 0; i < response.data.results.length; ++i)
                            this.MutenedPlayers.push(response.data.results[i]);

                        if (response.data.next != null)
                            this.pagination.MutedNext = response.data.next;
                        else this.pagination.MutedNext = null;
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
        },
        GetActiveMutes() {
            requests
                .get("/mutehistory/")
                .then(response => {
                    this.ActiveMutes = response.data.results;

                    if (response.data.next != null)
                        this.pagination.MutedNext = response.data.next;
                    else this.pagination.MutedNext = null;

                    if (this.Mutes != null && this.ActiveMutes != null)
                        this.show = false;
                })
                .catch(error => {
                    //console.log(error);
                });
        },
        GetMutes() {
            requests
                .get("/activemutes/")
                .then(response => {
                    this.ActiveMutes = response.data.results;

                    if (response.data.next != null)
                        this.pagination.MutedNext = response.data.next;
                    else this.pagination.MutedNext = null;

                    if (this.Mutes != null && this.ActiveMutes != null)
                        this.show = false;
                })
                .catch(error => {
                    //console.log(error);
                });
        }
    },
    mounted() {
        this.GetMutes();
        this.GetActiveMutes();
    }
};
</script>
