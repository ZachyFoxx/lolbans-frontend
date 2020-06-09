<template>
    <div>
        <v-col cols="12" align="center">
            <v-alert text color="primary"
                >The dashboard is still in development and the data below does
                not represent real data.</v-alert
            >
        </v-col>
        <v-row class="">
            <v-col cols="12" md="6" sm="6" lg="3" xs="">
                <materialcard
                    color="warning"
                    icon="mdi-file-document-box-multiple"
                    title="Appeals"
                    value="83"
                    smallValue="(45.108%)"
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="success"
                    icon="mdi-check-bold"
                    title="Approved Appeals"
                    value="36"
                    smallValue="(43.373%)"
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="error"
                    icon="mdi-close"
                    title="Denied Appeals"
                    value="10"
                    smallValue="(27.777%)"
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="warning"
                    icon="mdi-exclamation"
                    title="Unresolved Appeals"
                    value="37"
                    smallValue="(28.85%)"
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>

            <v-col class="my-12" cols="24" md="12">
                <CardBase color="warning" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Unresolved Appeals
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Appeals that have been unresolved will appear here
                        </div>
                    </template>
                    <v-card-text>
                        <v-data-table :headers="headers" :items="items" />
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col cols="12" md="6">
                <CardBase color="success" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Approved Appeals
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Appeals that have been approved will appear here
                        </div>
                    </template>
                    <v-card-text>
                        <v-data-table :headers="headers2" :items="items2" />
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col cols="12" md="6">
                <CardBase color="error" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Denied Appeals
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Appeals that have been denied will appear here
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
        headers: [
            {
                sortable: true,
                text: "Platform",
                value: "platform"
            },
            {
                sortable: false,
                text: "Punish ID",
                value: "pid"
            },
            {
                sortable: false,
                text: "Name",
                value: "name"
            },
            {
                sortable: true,
                text: "Punishment Reason",
                value: "punreason"
            },
            {
                sortable: false,
                text: "Date",
                value: "date"
            },
            {
                sortable: false,
                text: "Type",
                value: "type"
            }
        ],
        items: [
            {
                platform: "Minecraft",
                name: "NotZachery",
                pid: "#1A2B3C4D",
                punreason: "Fly hacking",
                type: "Wrongful Punishment",
                date: "04-30-2020 22:37:14"
            },
            {
                platform: "Discord",
                name: "Player0#1634",
                pid: "#2B3C4D5E",
                punreason: "Not listening to staff",
                type: "Plead Appeal",
                date: "04-30-2020 22:37:14"
            },
            {
                platform: "Minecraft",
                name: "Player1",
                pid: "#3C4D5E6F",
                punreason: "Griefing someones house",
                type: "Plead Appeal",
                date: "04-30-2020 22:37:14"
            },
            {
                platform: "Minecraft",
                name: "NotZachery",
                pid: "#1A2B3C4D",
                punreason: "Griefing someones base",
                type: "Wrongful Punishment",
                date: "04-30-2020 22:37:14"
            },
            {
                platform: "Minecraft",
                name: "NotZachery",
                pid: "#1A2B3C4D",
                punreason: "Griefing someones base",
                type: "Wrongful Punishment",
                date: "04-30-2020 22:37:14"
            }
        ],
        headers1: [
            {
                sortable: false,
                text: "Platform",
                value: "platform"
            },
            {
                sortable: false,
                text: "Name",
                value: "name"
            },
            {
                sortable: false,
                text: "Reporter",
                value: "reporter"
            },
            {
                sortable: false,
                text: "Reason",
                value: "reason"
            }
        ],
        items1: [
            {
                platform: "Minecraft",
                name: "Player0",
                reason: "He was cheating",
                reporter: "NotZachery"
            },
            {
                platform: "Discord",
                name: "Player#6297",
                reason: "Spamming chat",
                reporter: "NotZachery"
            },
            {
                platform: "Discord",
                name: "Player#1623",
                reason: "Harrasment",
                reporter: "NotZachery"
            },
            {
                platform: "Minecraft",
                name: "Player3",
                reason: "Fly hacking",
                reporter: "NotZachery"
            },
            {
                platform: "Minecraft",
                name: "Player4",
                reason: "Griefed my base",
                reporter: "NotZachery"
            }
        ],
        headers2: [
            {
                sortable: false,
                text: "Platform",
                value: "platform"
            },
            {
                sortable: false,
                text: "Name",
                value: "name"
            },
            {
                sortable: false,
                text: "Staff",
                value: "staff"
            },
            {
                sortable: false,
                text: "Reason",
                value: "reason"
            }
        ],
        items2: [
            {
                platform: "Minecraft",
                name: "Player0",
                reason: "He was cheating",
                staff: "NotZachery"
            },
            {
                platform: "Discord",
                name: "Player#6297",
                reason: "Spamming chat",
                staff: "NotZachery"
            },
            {
                platform: "Discord",
                name: "Player#1623",
                reason: "Not listening to staff",
                staff: "NotZachery"
            },
            {
                platform: "Minecraft",
                name: "Player3",
                reason: "Fly hacking",
                staff: "NotZachery"
            },
            {
                platform: "Minecraft",
                name: "Player4",
                reason: "Griefed my base",
                staff: "NotZachery"
            }
        ],
        items3: [
            {
                icon: "",
                country: "United States",
                punishments: 10,
                percent: "33%"
            },
            {
                icon: "",
                country: "Russia",
                punishments: 9,
                percent: "30%"
            },
            {
                icon: "",
                country: "Canada",
                punishments: 6,
                percent: "20%"
            },
            {
                icon: "",
                country: "United Kingdom",
                punishments: 5,
                percent: "16%"
            }
        ]
    }),
    methods: {},
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUserToken", "GetUsername"])
    },
    mounted() {}
};
</script>

<style></style>
