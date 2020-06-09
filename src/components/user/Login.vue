<template>
    <div>
        <CardBase color="success" class="px-5 py-3">
            <template v-slot:heading>
                <div class="display-1 font-weight-light" align="center">
                    Login
                </div>
                <div class="display-1 my-2 font-weight-light" align="center">
                    <v-btn icon><v-icon>mdi-discord</v-icon></v-btn>
                    <v-btn icon><v-icon>mdi-minecraft</v-icon></v-btn>
                </div>
            </template>
            <div align="center" class="font-weight-thin">
                Or login here
            </div>
            <v-card-text>
                <v-form>
                    <v-text-field
                        label="Username"
                        name="login"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="input.username"
                    />

                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="input.password"
                        v-on:keyup.enter="login()"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" text @click="handleClose"
                    >Close</v-btn
                >
                <v-btn color="blue darken-1" text @click="login()">Login</v-btn>
            </v-card-actions>
        </CardBase>
    </div>
</template>

<script>
import requests from "../../utils/requests";
import MaterialCard from "../../components/base/MaterialStatsCard.vue";
import CardBase from "../../components/base/MaterialCard.vue";

export default {
    name: "Login",
    computed: {},
    components: {
        materialcard: MaterialCard,
        CardBase: CardBase
    },
    data: () => ({
        dialog: false,
        input: {
            username: "",
            password: ""
        }
    }),

    methods: {
        login() {
            if (this.input.username != "" && this.input.password != "") {
                requests
                    .post("/user/login/", {
                        params: {
                            username: this.input.username,
                            password: this.input.password
                        }
                    })
                    .then(response => {
                        // TODO: Fix the username being their realname
                        this.$store.commit("SetUserInfo", {
                            token: response.data.Token,
                            Username: response.data.Username,
                            RealName: response.data.RealName
                        });
                        this.dialog = true;
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "index" });
                    })
                    .catch(error => {
                        // TODO: Make this show an error.
                        console.log(error);
                        this.$store.commit("ClearUserInfo");
                    })
                    .finally(() => {
                        // Clear the user's credentials for security
                        this.input.password = null;
                        this.input.username = null;
                    });
            }
        },
        handleClose() {
            this.$emit("onClose");
        }
    }
};
</script>
