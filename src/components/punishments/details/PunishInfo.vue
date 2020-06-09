<template>
    <div>
        <v-container fluid  style="margin-bottom: -15px;">
            <v-row dense align="center">
                <v-col cols="0">
                    <v-list-item-content style="padding: 0px">
                        <v-list-item-title class="font-weight-bold">Type</v-list-item-title>
                    </v-list-item-content>
                </v-col>

                <v-col cols="0">
                    
                </v-col>
                
                <v-col cols="3">
                    <v-list-item-content style="padding: 0px">
                        <v-list-item-title class="font-weight-bold">Staff Member</v-list-item-title>
                    </v-list-item-content>
                </v-col>

                <v-col cols="3">
                    <v-list-item-content style="padding: 0px">
                        <v-list-item-title>
                            <span class="font-weight-bold">Reason</span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-col>
                <v-col class="text-right" cols="5">
                </v-col>
            </v-row>
        </v-container>
        <div>
            <v-card :elevation="0" style="margin-bottom: 10px">
                <v-container fluid>
                    <v-row dense align="center">
                        <v-col cols="0">
                            <v-list-item-content style="padding: 0px">
                                <v-list-item-title v-if="pinfo.Status.BannedBefore" class="red--text font-weight-bold">Ban</v-list-item-title>

                                <v-list-item-title v-if="pinfo.Type.Mute" class="yellow--text font-weight-bold">Mute</v-list-item-title>

                                <v-list-item-title v-if="pinfo.Type.Kick" class="blue--text font-weight-bold">Kick</v-list-item-title>

                                <v-list-item-title v-if="pinfo.Type.Warn" class="blue--text font-weight-bold">Warn</v-list-item-title>
                            </v-list-item-content>
                        </v-col>

                        <v-col cols="0">
                            <v-divider> </v-divider>
                        </v-col>
                        
                        <v-col cols="3">
                            <v-list-item-content style="padding: 0px">
                                <v-list-item-title>{{pinfo.Arbiter}}</v-list-item-title>
                            </v-list-item-content>
                        </v-col>

                        <v-col cols="7">
                            <v-list-item-content style="padding: 0px">
                                <v-list-item-title>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <span v-on="on">{{pinfo.Reason}}</span>
                                        </template>
                                        <span>{{pinfo.Reason}}</span>
                                    </v-tooltip>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-col>
                        <v-col class="text-right" cols="1">
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-divider> </v-divider>
        </div>
    </div>
</template>

<script>
export default {
	name: "PunishInfo",
	props: ["pinfo"],
	data: () => ({}),
	methods: {}
};
</script>