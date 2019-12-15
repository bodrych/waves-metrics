<template>
  <v-app>
    <v-app-bar app dense elevation="2">
      <span class="headline font-weight-light">Waves</span><span class="headline">Metrics</span>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn href="https://github.com/bodrych/" target="_blank" icon><v-icon>mdi-github-circle</v-icon></v-btn> -->
    </v-app-bar>

    <v-content>
      <RouterView/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),
};
</script>
