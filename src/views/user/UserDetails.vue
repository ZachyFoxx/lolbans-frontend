<template>
	<div>
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
				<div v-show="!show" v-if="IsReal()">
					<v-card outlined>
						<v-card-text>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="headline mb-1">
										{{ UserDetails.User.Username }} 
										<!-- TODO: check is user has linked account/is verified | mdi-close-circle-outline -->
										<v-icon>mdi-check-circle-outline</v-icon> 
										<span v-if="UserDetails.Status.Banned" class="font-weight-light text--disabled" style="font-size: 15px; margin-bottom: 0px;"> (BANNED)</span>
										<span v-if="UserDetails.Status.Muted" class="font-weight-light text--disabled" style="font-size: 15px; margin-bottom: 0px;"> (MUTED)</span>
									</v-list-item-title>
									<v-list-item-subtitle>{{ UserDetails.User.UUID }}</v-list-item-subtitle>
									<v-list-item-subtitle></v-list-item-subtitle>
									<!-- TODO: Make this a function instead of doing a whole bunch of v-ifs -->
									<div v-if="UserDetails.User.LastPunished != null">
										<p class="font-weight-light text--disabled" style="font-size: 15px; margin-bottom: 0px;">(Last Punished by: {{ UserDetails.User.LastArbiter }} on {{ UserDetails.User.LastPunished | formatdate }})</p>
									</div>
								</v-list-item-content>

								<v-list-item-avatar tile size="90">
									<v-img :src="GetAvatarURL(UserDetails.User.UUID)" />
								</v-list-item-avatar>
							</v-list-item>
						</v-card-text>
						<v-tabs class="ma-0" :fixed-tabs="$vuetify.breakpoint.smAndDown">
							<v-tab>
								<v-icon :left="$vuetify.breakpoint.mdAndUp"
									>mdi-gavel</v-icon
								>
								<span v-if="$vuetify.breakpoint.mdAndUp">Punishments</span>
							</v-tab>

							<v-tab>
								<v-icon :left="$vuetify.breakpoint.mdAndUp"
									>mdi-file-document-box-multiple-outline</v-icon
								>
								<span v-if="$vuetify.breakpoint.mdAndUp">Reports</span>
							</v-tab>

							<v-tab>
								<v-icon :left="$vuetify.breakpoint.mdAndUp"
									>mdi-forum</v-icon
								>
								<span v-if="$vuetify.breakpoint.mdAndUp">Appeals</span>
							</v-tab>

							<v-tab-item>
									<v-container fluid  style="margin-bottom: -15px;">
										<v-row dense align="center">
											<v-col cols="0">
												<v-list-item-content style="padding: 0px">
													<v-list-item-title class="font-weight-bold">Type</v-list-item-title>
												</v-list-item-content>
											</v-col>

											<v-col cols="0">
												
											</v-col>
											
											<v-col cols="4">
												<v-list-item-content style="padding: 0px">
													<v-list-item-title class="font-weight-bold">Staff Member</v-list-item-title>
												</v-list-item-content>
											</v-col>

											<v-col cols="2">
												<v-list-item-content style="padding: 0px">
													<v-list-item-title>
														<span class="font-weight-bold">Reason</span>
													</v-list-item-title>
												</v-list-item-content>
											</v-col>
											<v-col class="text-right" cols="5">
												<v-list-item-content style="padding: 0px">
													<v-list-item-title>
														<p class="font-weight-light text--disabled" style="font-size: 15px; margin-bottom: 0px;">(Ordered by Time Added)</p>
													</v-list-item-title>
												</v-list-item-content>
											</v-col>
										</v-row>
									</v-container>
								<div v-for="player in Punishments" :key="player._id">
									<v-card :elevation="0" style="margin-bottom: 10px">
										<v-container fluid>
											<v-row dense align="center">
												<v-col cols="0">
													<v-list-item-content style="padding: 0px">
														<v-list-item-title v-if="player.Type == 0" class="red--text font-weight-bold">Ban</v-list-item-title>
														<v-list-item-title v-if="player.Type == 1" class="yellow--text font-weight-bold">Mute</v-list-item-title>
														<v-list-item-title v-if="player.Type == 2" class="blue--text font-weight-bold">Warn</v-list-item-title>
														<v-list-item-title v-if="player.Type == 3" class="blue--text font-weight-bold">Kick</v-list-item-title>
													</v-list-item-content>
												</v-col>

												<v-col cols="0">
													<v-divider> </v-divider>
												</v-col>
												
												<v-col cols="4">
													<v-list-item-content style="padding: 0px">
														<v-list-item-title>{{player.ArbiterName}}</v-list-item-title>
													</v-list-item-content>
												</v-col>

												<v-col cols="3">
													<v-list-item-content style="padding: 0px">
														<v-list-item-title>
															<span>{{player.Reason}}</span>
														</v-list-item-title>
													</v-list-item-content>
												</v-col>
												<v-col class="text-right" cols="2">
													<v-btn :icon="$vuetify.breakpoint.smAndDown" depressed>
														<v-icon :left="$vuetify.breakpoint.mdAndUp"
															>mdi-lead-pencil</v-icon
														>
														<span v-if="$vuetify.breakpoint.mdAndUp">Edit</span>
													</v-btn>
												</v-col>

												<v-col class="text-right" cols="2">
													<v-btn :icon="$vuetify.breakpoint.smAndDown" depressed
													:to="{
														name: 'PunishDetails',
														params: { punishmentid: player.PunishID }
													}">
														<v-icon :left="$vuetify.breakpoint.mdAndUp"
															>mdi-card-bulleted</v-icon
														>
														<span v-if="$vuetify.breakpoint.mdAndUp">More Info</span>
													</v-btn>
												</v-col>
											</v-row>
										</v-container>
									</v-card>
									<v-divider> </v-divider>
								</div>

							</v-tab-item>

						</v-tabs>
					</v-card>
				</div>
			</v-expand-transition>
		</div>
	</div>
</template>

<script>
import moment from "moment-timezone";

import requests from "../../utils/requests";
import Punishment from "../../components/punishments/offences/BanRow.vue";

export default {
	name: "UserDetails",
	props: {
		uuid: {
			type: String,
			default: ""
		}
	},
	components: {
		Punishment: Punishment,
	},
	computed: {},
	methods: {
		GetAvatarURL(uuid) {
			if (uuid === "console") {
				return "/static/img/console.png";
			}
			return "https://crafatar.com/avatars/" + uuid;
		},
		GetUserDetails() {
			requests
				.get("/userdetails/", { params: { uuid: this.uuid } })
				.then(response => {
					this.UserDetails = response.data;
					console.log(this.UserDetails);
				})
				.catch(error => {
					// If it's a 401 unauthorized, redirect them to the login page
					
					//console.log(error);
				});
		},
		GetPunishmentStats() {
			if (this.UserDetails != null)
				return `${this.UserDetails.TimesPunished.Total}`;

			return "0";
		},
		GetFullPunishmentStats() {
			if (this.UserDetails != null)
				return `(${this.UserDetails.TimesPunished.Bans} bans, ${this.UserDetails.TimesPunished.Warnings} warnings, ${this.UserDetails.TimesPunished.Mutes} mutes, and ${this.UserDetails.TimesPunished.KickHistory} KickHistory)`;

			return "0";
		},
		GetKickHistory(uuid) {
			requests
				.get("/KickHistory/", { params: { uuid: uuid } })
				.then(response => {
					this.KickHistory = response.data.results;
				})
				.catch(error => {
					if (error.response.status === 401)
						this.$router.replace({ name: "login" });
					//console.log(error);
				});
		},
		GetBanHistory(uuid) {
			requests
				.get("/bannedplayerhistory/", { params: { uuid: uuid } })
				.then(response => {
					this.BannedPlayers = response.data.results;
				})
				.catch(error => {
					if (error.response.status === 401)
						this.$router.replace({ name: "login" });
					//console.log(error);
				});
		},
		GetWarnings(uuid) {
			requests
				.get("/warnings/", { params: { uuid: uuid } })
				.then(response => {
					this.Warnings = response.data.results;
				})
				.catch(error => {
					if (error.response.status === 401)
						this.$router.replace({ name: "login" });
					//console.log(error);
				});
		},
		GetMutes(uuid) {
			requests
				.get("/mutehistory/", { params: { uuid: uuid } })
				.then(response => {
					this.Mutes = response.data.results;
					console.log(response.data.results);
				})
				.catch(error => {
					if (error.response.status === 401)
						this.$router.replace({ name: "login" });
					//console.log(error);
				});
			console.log(this.Mutes);
		},
		GetPunishments(uuid) {
			requests
				.get("/punishments/", { params: { uuid: uuid } })
				.then(response => {
					this.Punishments = response.data.results;
					console.log(response.data.results);
				})
				.catch(error => {
					if (error.response.status === 401)
						this.$router.replace({ name: "login" });
					//console.log(error);
				});
		},
		IsReal()
        {
            if (this.UserDetails.Message == "No such UUID")
                this.$router.replace({name: "not-found"});
            return true;
        },
	},
	filters: {
		expiry: function(date) {
			if (date != null) {
				if (moment(date).isAfter(moment()))
					return moment(date)
						.tz("UTC")
						.toNow();
				else
					return moment(date)
						.tz("UTC")
						.fromNow();
			} else return "Indefinite";
		},
		formatdate: function(date) {
			if (date != null)
				return moment(date)
					.tz("UTC")
					.format("MMM D YYYY, HH:mm UTC");
			else return "Indefinite";
		},
		timezoneify: function(date) {
			if (date != null) {
				return moment(date)
					.tz("UTC")
					.format("MMM D YYYY, HH:mm UTC");
			} else return "";
		}
	},
	data: () => ({
		UserDetails: {},
		show: true,
		KickHistory: null,
		BannedPlayers: null,
		Warnings: null,
		Mutes: null,
		Punishments: null,
	}),
	mounted() {
		this.GetUserDetails();
		this.GetKickHistory(this.uuid);
		this.GetBanHistory(this.uuid);
		this.GetWarnings(this.uuid);
		this.GetMutes(this.uuid);
		this.GetPunishments(this.uuid);
		let main = this;
		setTimeout(() => {
			main.show = false;
		}, 1000);
	}
};
</script>
