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
                        <v-list-item-title class="font-weight-bold">Reporter</v-list-item-title>
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
        <div v-for="report in rinfo" :key="report._id">
            <v-card :elevation="0" style="margin-bottom: 10px">
                <v-container fluid>
                    <v-row dense align="center">
                        <v-col cols="0">
                            <v-list-item-content style="padding: 0px">
                                <v-list-item-title class="red--text font-weight-bold">Game</v-list-item-title>
                            </v-list-item-content>
                        </v-col>

                        <v-col cols="0">
                            <v-divider> </v-divider>
                        </v-col>
                        
                        <v-col cols="3">
                            <v-list-item-content style="padding: 0px">
                                <v-list-item-title>{{ report.PlaintiffName }}</v-list-item-title>
                            </v-list-item-content>
                        </v-col>

                        <v-col cols="7">
                            <v-list-item-content style="padding: 0px">
                                <v-list-item-title>
                                    <span >{{ report.Reason }}</span>
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
	name: "ReportsInfo",
	props: ["rinfo"],
	data: () => ({}),
	methods: {}
};
</script>