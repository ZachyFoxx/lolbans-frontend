<template>
    <div>
        <v-row>
            <v-col cols="6">
                <v-card elevation="1">
                    <v-card-text>
                        <h1 class="font-weight-bold" align="center">
                            Other Information
                        </h1>
                        <v-divider class="mt-4"></v-divider>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Language Selection</p>
                            <v-select
                                :items="languages"
                                v-model="currentLanguage"
                                label="Language"
                                outlined
                                @change="changeLanguage()"
                            ></v-select>
                        </div>
                        <v-divider></v-divider>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Linked Accounts</p>
                            <p>Add or remove linked accounts</p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">mdi-plus-circle</v-icon>
                                Add New
                            </v-btn>
                            <v-data-table
                                :headers="headers"
                                :items="accounts"
                                :items-per-page="5"
                            >
                                <template v-slot:item.actions="{ item }">
                                    <v-icon
                                        small
                                        class="mr-2"
                                        @click="editItem(item)"
                                    >
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small @click="deleteItem(item)">
                                        mdi-delete
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </div>
                        <v-divider></v-divider>
                        <div class="mt-4 mb-4"></div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card elevation="1">
                    <v-card-text>
                        <h1 class="font-weight-bold" align="center">
                            Personal Information
                        </h1>
                        <v-divider class="mt-4"></v-divider>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Real Name</p>
                            <p>Update or add your real name</p>
                            <p>
                                <span class="font-weight-bold"
                                    >Current Name</span
                                >: {{ namesettings.RealName }}
                            </p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">fa-edit</v-icon>
                                Update Username
                            </v-btn>
                            <v-divider class="mt-4"></v-divider>
                        </div>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Username</p>
                            <p>Update your username</p>
                            <p>
                                <span class="font-weight-bold"
                                    >Current Username</span
                                >: {{ GetUsername }}
                            </p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">fa-edit</v-icon>
                                Update Username
                            </v-btn>
                            <v-divider class="mt-4"></v-divider>
                        </div>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">E-Mail Address</p>
                            <p>
                                Add or update your email address for account
                                recovery
                            </p>
                            <p>
                                <span class="font-weight-bold"
                                    >Current Email</span
                                >: {{ email.curemail }}
                            </p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">fa-edit</v-icon>
                                Update Email
                            </v-btn>
                        </div>
                        <v-divider class="mt-4"></v-divider>
                        <div class="mt-4 mb-4">
                            <p class="font-weight-bold">Password</p>
                            <p>Update your password</p>
                            <v-btn
                                color="primary"
                                @click="dialog = true"
                                outlined
                            >
                                <v-icon class="mr-2">fa-edit</v-icon>
                                Update Password
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>

    <!--	<div>
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
            <v-card :elevation="0" style="margin-bottom: 10px" outlined>
                <v-container fluid>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">
                                <span>{{ namesettings.RealName }}</span>
                                <!-- add checkmark icon if verified.
                            </v-list-item-title>
                            <span class="font-weight-light text--secondary">Edit your profile</span >
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider style="margin-top: 20px;"> </v-divider>
                    <v-container fluid >
                    
                    <MojangLink v-bind:style="{cursor: selectedCursor}"/>
                        
                    <v-divider style="margin-top: 20px; margin-bottom: 20px;"> </v-divider>
                    
                    <NameChange v-bind:style="{cursor: selectedCursor}" />

                    <v-divider style="margin-top: 20px; margin-bottom: 20px;"> </v-divider>
                    <v-dialog v-model="email.show" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-row dense v-on="on" v-bind:style="{cursor: selectedCursor}" align="center">
                                <v-col cols="0">
                                    <v-list-item-content style="padding: 0px">
                                        <v-list-item-title class="font-weight-bold text--secondary" style="font-size: 12px;"
                                            >EMAIL</v-list-item-title >
                                    </v-list-item-content>
                                </v-col>

                                <v-col cols="0"> </v-col>

                                <v-col cols="3">
                                    <v-list-item-content style="padding: 0px">
                                        <v-list-item-title>{{ email.curemail }}</v-list-item-title >
                                    </v-list-item-content>
                                </v-col>

                                <v-col cols="1">
                                    <v-list-item-content style="padding: 0px">
                                        <v-list-item-title>
                                            <span></span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-col>
                                <v-col class="text-right" cols="5">
                                <v-list-item-title>
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-col>
                            </v-row>
                        </template>
                            <v-card>
                                <v-card-title>
                                    <span>Edit E-Mail</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-form ref="form" lazy-validation>
                                            <v-text-field
                                                label="New E-Mail"
                                                v-model="email.newemail"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                label="Confirm New E-Mail"
                                                v-model="email.confirm"
                                                :color="email.isvalid"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                label="Password"
                                                v-model="email.password"
                                                required
                                                type="password"
                                            ></v-text-field>
                                        </v-form>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="email.show = false">Close</v-btn>
                                    <v-btn color="blue darken-1" text @click="ChangeEmail()">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        
                    <v-divider style="margin-top: 20px; margin-bottom: 20px;"> </v-divider>
                    <v-dialog v-model="passwd.show" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-row dense v-on="on" v-bind:style="{cursor: selectedCursor}" align="center">
                                <v-col cols="0">
                                    <v-list-item-content style="padding: 0px">
                                        <v-list-item-title class="font-weight-bold text--secondary" style="font-size: 12px;"
                                            >PASSWORD</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-col>

                                <v-col cols="0"> </v-col>

                                <v-col cols="3">
                                    <v-list-item-content style="padding: 0px">
                                        <v-list-item-title></v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-col>

                                <v-col cols="1">
                                    <v-list-item-content style="padding: 0px">
                                        <v-list-item-title>
                                            <span></span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-col>
                                <v-col class="text-right" cols="5">
                                <v-list-item-title>
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-col>
                            </v-row>
                        </template>
                            <v-card>
                                <v-card-title>
                                    <span>Change Password</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-form ref="form" lazy-validation>
                                            <v-text-field
                                                label="Current Password"
                                                v-model="passwd.curpass"
                                                required
                                                type="password"
                                            ></v-text-field>
                                            <v-text-field
                                                label="New Password"
                                                v-model="passwd.newpass"
                                                required
                                                type="password"
                                            ></v-text-field>
                                            <v-text-field
                                                label="Confirm New Password"
                                                v-model="passwd.confirm"
                                                :color="passwd.isvalid"
                                                required
                                                type="password"
                                            ></v-text-field>
                                        </v-form>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="passwd.show = false">Close</v-btn>
                                    <v-btn color="blue darken-1" text @click="ChangePassword()">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-container>

                    <!--
    <v-list-item-avatar color="grey darken-3">
        <v-img
        class="elevation-6"
        src="https://crafatar.com/avatars/f78a4d8d-d51b-4b39-98a3-230f2de0c670"
        ></v-img>
    </v-list-item-avatar>
    


                </v-container>
            </v-card>
            </div>

            <v-dialog v-model="dialog" persistent max-width="600px">
                <LoginDialog @onClose="handleClose"/>
            </v-dialog>
        </v-expand-transition>
	</div>-->
</template>

<script>
import { mapGetters } from "vuex";

import requests from "../../utils/requests";
import MojangLink from "../../components/user/settings/MojangLink.vue";
import NameChange from "../../components/user/settings/NameChange.vue";

export default {
    name: "UserSettings",
    components: {
        MojangLink: MojangLink,
        NameChange: NameChange
    },
    data: () => ({
        show: true,
        dialog: false,
        selectedCursor: "pointer",
        username: null,

        namesettings: {
            RealName: null,
            first: null,
            last: null
        },
        passwd: {
            curpass: null,
            newpass: null,
            confirm: null,
            show: false
        },
        email: {
            curemail: null,
            newemail: null,
            confirm: null,
            password: null,
            isvalid: false,
            show: false
        },
        snackbar: {
            show: false,
            text: "thingy",
            timeout: 2000
        },
        languages: [
            { text: "English", value: "en" },
            { text: "Español", value: "es" }
        ],
        currentLanguage: "",
        headers: [
            {
                text: "Platform",
                align: "start",
                sortable: false,
                value: "platform"
            },
            { text: "Username", value: "username" },
            { text: "Date Linked", value: "datelinked" },
            { text: "Actions", value: "actions", sortable: false }
        ],
        accounts: [
            {
                platform: "Discord",
                username: "Zachery#0001",
                datelinked: "04-26-2020 15:43:20",
                datelinked: "04-26-2020 15:43:20"
            },
            {
                platform: "Minecraft",
                username: "NotZachery",
                datelinked: "04-26-2020 15:43:20"
            },
            {
                platform: "Minecraft",
                username: "KnotZachery",
                datelinked: "04-26-2020 15:43:20"
            }
        ]
    }),
    methods: {
        changeLanguage() {
            window.localStorage.setItem("app_language", this.currentLanguage);
            window.location.reload();
        },
        ChangeEmail() {
            // TODO: Maybe tell the user they're retarded?
            if (this.email.newemail != this.email.confirm) return;

            requests
                .post("/user/updateemail/", {
                    params: {
                        email: this.email.confirm,
                        passwd: this.email.password
                    }
                })
                .then(response => {
                    this.email.curemail = this.email.confirm;
                    this.email.show = false;
                })
                .catch(err => {
                    // TODO: Handle this better.
                    if (err.status_code == 401) {
                        //alert(err.response.error);
                    }
                })
                .finally(() => {
                    this.email.password = null;
                });
        },
        ChangePassword() {
            // TODO: Tell the user they're retarded.
            if (this.passwd.newpass != this.passwd.confirm) return;

            requests
                .post("/user/updatepasswd/", {
                    params: {
                        curpass: this.passwd.curpass,
                        passwd: this.passwd.confirm
                    }
                })
                .then(response => {
                    // TODO: Show a snackbar saying their password was updated??
                    this.passwd.show = false;
                })
                .catch(err => {
                    if (err.response.status == 400) {
                        // TODO: Handle `errors` array more cleanly
                        //alert(err.response.data.error);
                        //alert(err.response.data.errors);
                    }
                })
                .finally(() => {
                    this.passwd.newpass = null;
                    this.passwd.curpass = null;
                    this.passwd.confirm = null;
                });
        },
        handleClose() {
            this.dialog = false;
        }
    },
    watch: {
        "email.confirm": function(val) {
            if (val != null || val != "") {
                if (val == this.email.newemail) this.email.isvalid = "green";
                else this.email.isvalid = "red";
            }
        },
        "passwd.confirm": function(val) {
            if (val != null || val != "") {
                if (val == this.passwd.newpass) this.passwd.isvalid = "green";
                else this.passwd.isvalid = "red";
            }
        }
    },
    computed: {
        ...mapGetters(["IsAuthenticated", "GetUserToken", "GetUsername"])
    },
    mounted() {
        // Populate the user info crap
        requests
            .get("/user/info/")
            .then(res => {
                var u = res.data;
                this.namesettings.first = u.FirstName;
                this.namesettings.last = u.LastName;
                this.namesettings.RealName = u.RealName;
                this.email.curemail = u.email;
                this.username = u.Username;
            })
            .catch(err => {
                console.log(err);
                //alert(err);
                this.$router.replace({ name: "index" });
            })
            .finally(() => (this.show = false));
        let language = window.localStorage.getItem("app_language");
        if (language === null) {
            language = navigator.language;
            this.currentLanguage = "en";
        } else {
            this.currentLanguage = language;
        }
    }
};
</script>
