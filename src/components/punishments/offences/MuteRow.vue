<template>
	<div>
		<v-card v-if="Active==true ? true : false" style="margin-bottom: 10px">
			<v-container fluid>
				<v-list-item>
					<v-list-item-avatar tile size="40">
						<img :src="GetAvatarURL(Mute.UUID)" />
					</v-list-item-avatar>
					<v-list-item-content style="padding: 0px">
						<div class="overline text-truncate">
							{{ Mute.Reason }}
						</div>
						<v-list-item-title>{{
							Mute.PlayerName
						}}</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn
							:to="{
								name: 'PunishDetails',
								params: { punishmentid: Mute.PunishID }
							}"
							fill-height
							depressed
							:icon="!$vuetify.breakpoint.smAndUp"
						>
							<v-icon :left="$vuetify.breakpoint.smAndUp"
								>mdi-account</v-icon
							>
							<span v-if="$vuetify.breakpoint.smAndUp">More</span>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-container>
		</v-card>

		<v-card v-if="Active==false ? true : false" style="margin-bottom: 10px">
			<v-container fluid>
				<v-list-item>
					<v-list-item-avatar tile size="40">
						<img :src="GetAvatarURL(Mute.UUID)" />
					</v-list-item-avatar>
					<v-list-item-content style="padding: 0px">
						<div class="overline text-truncate">
							{{ Mute.Reason }}
						</div>
						<v-list-item-title>{{
							Mute.PlayerName
						}}</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn
							:to="{
								name: 'PunishDetails',
								params: { punishmentid: Mute.PunishID }
							}"
							fill-height
							depressed
							:icon="!$vuetify.breakpoint.smAndUp"
						>
							<v-icon :left="$vuetify.breakpoint.smAndUp"
								>mdi-account</v-icon
							>
							<span v-if="$vuetify.breakpoint.smAndUp">More</span>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-container>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "MuteRow",
	props: ["Mute", "Active"],
	data: () => ({}),
	methods: {
		GetAvatarURL(uuid) {
			if (uuid === "console") {
				return "/static/img/console.png";
			}
			return "https://crafatar.com/avatars/" + uuid + "?size=32";
		}
	}
};
</script>
