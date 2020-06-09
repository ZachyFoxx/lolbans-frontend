<template>
    <div v-if="IsReal()">
        <v-expand-transition>
            <div v-show="show">
                <v-row>
                    <v-col>
                        <v-skeleton-loader
                            v-for="i in 1"
                            style="margin-bottom: 10px"
                            type="image"
                        ></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
        </v-expand-transition>

        <v-expand-transition>
            <div v-show="!show">
                <v-card outlined>
                    <v-card-text>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="headline mb-1">
                                    <span>{{ PunishDetails.Username }}</span>
                                    <v-icon>mdi-check-circle-outline</v-icon>
                                    <!-- TODO: mdi-close-circle-outline -->
                                </v-list-item-title>
                                <v-list-item-subtitle
                                    >{{ PunishDetails.UUID }} | #{{
                                        PunishDetails.PunishID
                                    }}</v-list-item-subtitle
                                >
                                <v-list-item-subtitle></v-list-item-subtitle>
                                <!-- TODO: Make this a function instead of doing a whole bunch of v-ifs -->
                                <div v-if="PunishDetails.Type">
                                    <p
                                        v-if="
                                            PunishDetails.Status.BannedBefore &&
                                                !PunishDetails.Status.Banned &&
                                                PunishDetails.UnbanReason ==
                                                    null
                                        "
                                        class="font-weight-light text--disabled"
                                        style="font-size: 15px; margin-bottom: 0px;"
                                    >
                                        ({{
                                            PunishDetails.Punished | formatdate
                                        }}) (Un-Banned: Expired)
                                    </p>

                                    <p
                                        v-else-if="
                                            PunishDetails.Status.BannedBefore &&
                                                !PunishDetails.Status.Banned &&
                                                PunishDetails.UnbanReason !=
                                                    null
                                        "
                                        class="font-weight-light text--disabled"
                                        style="font-size: 15px; margin-bottom: 0px;"
                                    >
                                        ({{
                                            PunishDetails.Punished | formatdate
                                        }}) (Un-Banned by
                                        {{ PunishDetails.UnbanArbiter }}:
                                        {{ PunishDetails.UnbanReason }})
                                    </p>

                                    <p
                                        v-else-if="
                                            PunishDetails.Status.MutedBefore &&
                                                !PunishDetails.Status.Muted &&
                                                PunishDetails.UnmuteReason ==
                                                    null
                                        "
                                        class="font-weight-light text--disabled"
                                        style="font-size: 15px; margin-bottom: 0px;"
                                    >
                                        ({{
                                            PunishDetails.Punished | formatdate
                                        }}) (Un-Muted: Epiry)
                                    </p>

                                    <p
                                        v-else-if="
                                            PunishDetails.Status.MutedBefore &&
                                                !PunishDetails.Status.Muted &&
                                                PunishDetails.UnmuteReason !=
                                                    null
                                        "
                                        class="font-weight-light text--disabled"
                                        style="font-size: 15px; margin-bottom: 0px;"
                                    >
                                        ({{
                                            PunishDetails.Punished | formatdate
                                        }}) (Un-Muted by
                                        {{ PunishDetails.UnmuteArbiter }}:
                                        {{ PunishDetails.UnmuteReason }})
                                    </p>

                                    <p
                                        v-else
                                        class="font-weight-light text--disabled"
                                        style="font-size: 15px; margin-bottom: 0px;"
                                    >
                                        ({{
                                            PunishDetails.Punished | formatdate
                                        }})
                                    </p>
                                </div>
                            </v-list-item-content>

                            <v-list-item-avatar tile size="80">
                                <v-img
                                    :src="GetAvatarURL(PunishDetails.UUID)"
                                />
                            </v-list-item-avatar>
                        </v-list-item>
                    </v-card-text>
                    <v-tabs
                        class="ma-0"
                        :fixed-tabs="$vuetify.breakpoint.smAndDown"
                    >
                        <v-tab>
                            <v-icon :left="$vuetify.breakpoint.mdAndUp"
                                >mdi-gavel</v-icon
                            >
                            <span v-if="$vuetify.breakpoint.mdAndUp"
                                >Punishment Info</span
                            >
                        </v-tab>

                        <!-- TODO: if there is a report that lead to this punishment, show this button -->
                        <v-tab>
                            <v-icon :left="$vuetify.breakpoint.mdAndUp"
                                >mdi-file-document-box-multiple-outline</v-icon
                            >
                            <span v-if="$vuetify.breakpoint.mdAndUp"
                                >Reports</span
                            >
                        </v-tab>

                        <!-- TODO: if there is an appeal, show this button -->
                        <v-tab>
                            <v-icon :left="$vuetify.breakpoint.mdAndUp"
                                >mdi-forum</v-icon
                            >
                            <span v-if="$vuetify.breakpoint.mdAndUp"
                                >Appeal</span
                            >
                        </v-tab>

                        <v-tab-item>
                            <PunishInfo :pinfo="PunishDetails" />
                        </v-tab-item>

                        <!-- Report Tab -->
                        <v-tab-item>
                            <ReportsInfo :rinfo="Reports" />
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
import moment from "moment-timezone";

import requests from "../../utils/requests";

import PunishInfo from "../../components/punishments/details/PunishInfo.vue";
import ReportsInfo from "../../components/punishments/details/ReportsInfo.vue";

export default {
    name: "PunishDetailsInfo",
    props: {
        punishmentid: {
            type: String,
            default: ""
        }
    },
    components: {
        PunishInfo: PunishInfo,
        ReportsInfo: ReportsInfo
    },
    data() {
        return {
            PunishDetails: null,
            Reports: {},
            IsFading: false,
            show: true,
            puninfo: false,
            isEditing: false,
            model: null
        };
    },
    filters: {
        expiry: function(date) {
            if (date != null)
                return moment(date).format("MMM D YYYY, HH:mm UTC");
            else return "Never";
        },
        acknowledged: function(acknowledged) {
            return acknowledged ? "Yes" : "No";
        },
        formatdate: function(date) {
            if (date != null)
                return moment(date).format("MMM D YYYY, HH:mm UTC");
            else return "Unknown";
        }
    },
    methods: {
        GetAvatarURL(uuid) {
            if (uuid == "console") return "/static/img/console.png";
            else return "https://crafatar.com/avatars/" + uuid + "?size=64";
        },
        GetPunishDetails() {
            requests
                .get("/punishdetails/", {
                    params: { punishid: this.punishmentid }
                })
                .then(response => {
                    this.PunishDetails = response.data;
                    this.GetReports();
                })
                .catch(error => {
                    // If it's a 401 unauthorized, redirect them to the login page
                    //console.log(error);
                    // TODO: Maybe show an error and get rid of the skeleton loader?
                    // make error page?
                    this.show = false;
                });
        },
        GetReports() {
            requests
                .get("/reports/", {
                    params: { defuuid: this.PunishDetails.UUID }
                })
                .then(response => {
                    this.Reports = response.data.results;
                })
                .catch(error => {
                    // If it's a 401 unauthorized, redirect them to the login page
                    console.log(error);
                })
                .finally(() => (this.show = false));
        },
        IsReal() {
            if (this.PunishDetails.Message == "No such Punish ID")
                this.$router.replace({ name: "not-found" });

            return true;
        },
        CopyToClipboard(uuid, copysuccesselement) {
            /* Get the text field */
            var copyText = document.createElement("textarea");
            copyText.value = uuid;
            copyText.style.position = "fixed"; // avoid scrolling
            document.body.appendChild(copyText);
            copyText.focus();

            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/

            /* Copy the text inside the text field */
            try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successful" : "unsuccessful";
                console.log("Fallback: Copying text command was " + msg);
            } catch (err) {
                console.error("Fallback: Oops, unable to copy", err);
            }

            document.body.removeChild(copyText);

            var copied = document.getElementById(copysuccesselement);
            copied.classList.remove("is-hidden");
            //this.FadeElement(copied);
            // TODO: Snackbar this copy message.
        }
    },
    mounted() {
        this.GetPunishDetails();
    }
};
</script>
