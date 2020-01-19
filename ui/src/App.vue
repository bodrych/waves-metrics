<template>
  <v-app>
    <v-app-bar
      short
      app
      clipped-left
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"/> -->
      <v-toolbar-title
        @click="$router.push({ name: 'home' })"
        style="cursor: pointer"
      >
        <span class="font-weight-light">Waves</span>
        <span>Metrics</span>
      </v-toolbar-title>
      <!-- <span class="headline font-weight-light">Waves</span><span class="headline">Metrics</span> -->
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn href="https://github.com/bodrych/" target="_blank" icon><v-icon dark>mdi-handshake</v-icon></v-btn> -->
    </v-app-bar>

<!--     <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

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
      drawer: false,
    }),
  };
</script>
