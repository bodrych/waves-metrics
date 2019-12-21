<template>
	<v-container fluid>
		<v-row>
			<v-col class="text-center">
				<!-- <v-card> -->
					<!-- <v-card-text> -->
						<span class="overline">{{ tooltip }}</span>
					<!-- </v-card-text> -->
				<!-- </v-card> -->
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="6">
				<ChartPeers/>
			</v-col>
			<v-col cols="12" md="6">
				<ChartPool/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import ChartPool from '@/components/ChartPool.vue'
	import ChartPeers from '@/components/ChartPeers.vue'

	export default {
		name: 'home',
		components: {
			ChartPool,
			ChartPeers,
		},
		computed: {
			tooltip() {
				return document.ontouchstart === undefined ? 'Click and drag to zoom in. Hold down shift key to pan.' : 'Pinch the chart to zoom in'
			}
		}
	}
</script>