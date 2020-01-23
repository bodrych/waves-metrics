<template>
  <v-card>
    <!-- <v-subheader>Status</v-subheader> -->
    <!-- <v-card-title>
      <span class="subtitle-1">Status</span>
    </v-card-title> -->
      <v-simple-table class="text-center">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Peers</th>
              <th class="text-center">Generating balance (24h)</th>
              <th class="text-center">Estimated annual leasing yield (1w)</th>
              <th class="text-center">Transactions (24h)</th>
              <th class="text-center">Block delay (1w)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ getStatusData.peers }}</td>
              <td>{{ +(getStatusData.balance / 1e8).toFixed(0) }} WAVES</td>
              <td>{{ +(getStatusData.profit * 100).toFixed(2) }}%</td>
              <td>{{ getStatusData.txs }}</td>
              <td>{{ getStatusData.delay }} sec</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    <!-- </v-card-text> -->
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.fetchStatusData();
  },
  computed: {
    ...mapGetters(["getStatusData"])
  },
  methods: {
    ...mapActions(["fetchStatusData"])
  }
};
</script>