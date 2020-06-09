<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-card elevation="1">
          <v-card-text>
            <div class="mb-4">
              <p>Select language</p>
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
                <p class="font-weight-bold">E-Mail Address</p>
                <p>Add or update your email address for account recovery</p>
                <p><span class="font-weight-bold">Current Email</span>: email@example.com</p>
            </div>
            <v-divider></v-divider>
            <div class="mt-4 mb-4">

            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card elevation="1">
          <v-card-text>
            <div class="mt-4 mb-4">
                <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4 mb-4">

            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  mounted() {
    let language = window.localStorage.getItem("app_language");
    if (language === null) {
      language = navigator.language;
      this.currentLanguage = "en";
    } else {
      this.currentLanguage = language;
    }
  },
  components: {

  },
  data() {
    return {
      languages: [
        { text: "English", value: "en" },
        { text: "Español", value: "es" }
      ],
      currentLanguage: ""
    };
  },
  methods: {
    changeLanguage() {
      window.localStorage.setItem("app_language", this.currentLanguage);
      window.location.reload();
    }
  }
};
</script>