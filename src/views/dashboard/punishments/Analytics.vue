<template>
    <div v-if="PunishStats != null">
        <v-col cols="12" align="center">
            <v-alert text color="primary"
                >The dashboard is still in development, some features may not be
                available.</v-alert
            >
        </v-col>
        <v-row class="">
            <v-col cols="12" md="6" sm="6" lg="3" xs="">
                <materialcard
                    color="error"
                    icon="mdi-gavel"
                    title="Punishments"
                    :value="
                        PunishStats.TotalStats.PlayersPunished +
                            '/' +
                            PunishStats.TotalStats.Total
                    "
                    :smallValue="
                        PunishStats.TotalStats.PercentPunished | percentage
                    "
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                    toolTip="Unique Punishments / Total Punishments"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="success"
                    icon="mdi-swap-horizontal"
                    title="Unique Connections"
                    :value="PunishStats.TotalStats.UniqueConnections"
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="info"
                    icon="mdi-comment-alert"
                    title="Reports"
                    :value="PunishStats.TotalStats.Reports"
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>
            <v-col cols="12" md="6" sm="6" lg="3">
                <materialcard
                    color="warning"
                    icon="mdi-file-document-box-multiple"
                    title="Appeals"
                    :value="0"
                    smallValue="(0.000%)"
                    sub-icon="mdi-clock"
                    sub-text="Last updated just now"
                />
            </v-col>

            <v-col class="my-12" cols="12" md="6">
                <CardBase color="info" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Staff Statistics
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Track the performance of your staff members
                        </div>
                    </template>
                    <v-card-text>
                        <v-data-table
                            no-data-text="There are no staff members on record"
                            :headers="headers"
                            :items="data"
                            :loading="loadingQuery"
                        />
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col class="my-12" cols="12" md="6">
                <CardBase color="error" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Latest Punishments
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Shows the last 5 punishments
                        </div>
                    </template>
                    <v-card-text>
                        <v-data-table
                            no-data-text="There are no punishments on record"
                            :headers="punheaders"
                            :items="pundata"
                            :loading="loadingQuery"
                        />
                    </v-card-text>
                </CardBase>
            </v-col>

            <!-- Add an apex line chart here, like the old on the old analytics page, it looks neat and is clicky button -->

            <v-col cols="12" md="6">
                <CardBase color="info" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Connection Statistics
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Track how many connections there were over the last
                            7 days
                        </div>
                    </template>
                    <v-card-text>
                        <v-responsive
                            style="max-height: 300px"
                            :aspect-ratio="16 / 9"
                        >
                            <apexchart
                                style="width: 100%; height: 100%;top: 0px; left: 0px"
                                type="area"
                                height="100%"
                                :options="optionsSmall"
                                :series="seriesArea"
                            ></apexchart>
                        </v-responsive>
                        <template v-slot:label="seriesArea">
                            {{ seriesArea.data }}
                        </template>
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col cols="12" md="6">
                <CardBase color="error" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Punishment Statistics
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Track how many punishments were issued over the last
                            7 days
                        </div>
                    </template>
                    <v-card-text>
                        <v-responsive
                            style="max-height: 300px"
                            :aspect-ratio="16 / 9"
                        >
                            <apexchart
                                style="width: 100%; height: 100%;top: 0px; left: 0px"
                                type="area"
                                height="100%"
                                :options="optionsSmall"
                                :series="seriesArea"
                            ></apexchart>
                        </v-responsive>
                        <template v-slot:label="seriesArea">
                            {{ seriesArea.data }}
                        </template>
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col class="my-12" cols="12" md="6">
                <CardBase color="info" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Connection Heatmap
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Track what countries connections are coming from
                        </div>
                    </template>
                    <v-card-text>
                        <v-col cols="12" align="center" justify="center">
                            <v-col cols="12">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                            <tr
                                                v-for="item in items3"
                                                :key="item.name"
                                            >
                                                <td>{{ item.icon }}</td>
                                                <td>{{ item.country }}</td>
                                                <td>{{ item.punishments }}</td>
                                                <td>{{ item.percent }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12">
                                <mapchart :countryData="geodata" />
                            </v-col>
                        </v-col>
                    </v-card-text>
                </CardBase>
            </v-col>

            <v-col class="my-12" cols="12" md="6">
                <CardBase color="error" class="px-5 py-3">
                    <template v-slot:heading>
                        <div class="display-1 font-weight-light">
                            Punishment Heatmap
                        </div>

                        <div class="subtitle-2 font-weight-light">
                            Track what countries have the most punishments
                        </div>
                    </template>
                    <v-card-text>
                        <v-col cols="12" align="center" justify="center">
                            <v-col cols="12">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                            <tr
                                                v-for="item in items3"
                                                :key="item.name"
                                            >
                                                <td>{{ item.icon }}</td>
                                                <td>{{ item.country }}</td>
                                                <td>{{ item.punishments }}</td>
                                                <td>{{ item.percent }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12">
                                <mapchart :countryData="geodata" />
                            </v-col>
                        </v-col>
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
    methods: {
        GetPunishStats() {
            requests
                .get("/punishments/?limit=5")
                .then(response => {
                    this.pundata = response.data.results;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => (this.show = false));
        },
        query() {
            this.loadingQuery = true;
            requests
                .get("/statistics/")
                .then(response => {
                    this.PunishStats = response.data;
                    this.data = response.data.TotalStats.PunishmentsArbiters;
                })
                .catch(error => {
                    console.log(error);
                });
            this.loadingQuery = false;
        },
        GetGraphData() {
            requests
                .get("/statistics/TimedTotalStats/")
                .then(response => {
                    var data = [];
                    for (var i = 0; i < response.data.length; i++) {
                        console.log(response.data[i]);

                        data.push({
                            x: response.data[i].date,
                            y: response.data[i].total
                        });
                    }
                    this.seriesArea = [{ data }];
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    data: () => ({
        data: [],
        headers: [
            { text: "Name", value: "Name" },
            { text: "Punishments", value: "Amount" },
            { text: "UUID", value: "UUID" }
        ],
        loadingQuery: false,
        PunishStats: null,
        labels: ["Sun", "Mon", "Tue", "Wen", "Thru", "Fri", "Sat"],
        value: [200, 675, 410, 390, 310, 460, 250],
        geodata: {
            US: 10,
            CA: 6,
            UK: 5,
            RU: 9
        },
        punheaders: [
            { text: "PunishID", value: "PunishID" },
            { text: "Name", value: "PlayerName" },
            { text: "Staff", value: "ArbiterName" },
            { text: "Reason", value: "Reason" }
        ],
        pundata: [],
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
        ],
        seriesArea: [
            {
                name: "Punishments",
                data: []
            }
        ],
        seriesArea2: [
            {
                name: "Connections",
                data: [134, 97, 123, 423, 512, 398, 423]
            }
        ],
        optionsSmall: {
            colors: ["#2196f3"],
            theme: {
                mode: "false"
            },
            chart: {
                animations: {
                    enabled: false,
                    easing: "easeout",
                    speed: 500
                },
                toolbar: {
                    show: false
                },
                sparkline: {
                    enabled: true
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter(y) {
                        if (typeof y !== "undefined") return y.toFixed(0);
                        return y;
                    }
                },
                x: {
                    format: "MMM dd yyyy HH:mm:ss"
                }
            },
            xaxis: {
                crosshairs: {
                    show: false
                },
                type: "datetime"
            },

            grid: {
                show: true,
                borderColor: "#474747",
                strokeDashArray: 0,
                position: "back",
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                row: {
                    colors: undefined,
                    opacity: 0.5
                },
                column: {
                    colors: undefined,
                    opacity: 0.5
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            stroke: {
                curve: "straight"
            }
        }
    }),
    filters: {
        percentage: function(percent) {
            if (percent != null) {
                return "(%" + percent + ")";
            } else return "(%0.000)";
        }
    },
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUserToken", "GetUsername"])
    },
    mounted() {
        this.GetPunishStats();
        this.GetGraphData();
        this.query();
        setInterval(() => {
            if (this.$vuetify.breakpoint.mdAndUp) {
                this.GetPunishStats();
                this.GetGraphData();
            }
        }, 30000);
    }
};
</script>

<style></style>
