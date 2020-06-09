<template>
    <div>
        <v-expand-transition>
            <div v-show="show">
                <v-row>
                <v-col cols="12" v-for="i in 1" :key="i">
                    <v-skeleton-loader type="image" />
                </v-col>
                </v-row>
            </div>
        </v-expand-transition>
        <v-expand-transition>
            <div v-show="!show">
                <center style="margin-top: 100px">
                    <img src="/static/img/creeper.png" />
                    <h1 class="mt-3">SSSSORY!</h1>
                    <h2>The page you were looking for could not be found!</h2>
                </center>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    computed: {},
    data: () => ({
        show: true
    }),
    mounted() {
    let main = this;
    setTimeout(() => {
      main.show = false;
    }, 1000);
  },
};
</script>
