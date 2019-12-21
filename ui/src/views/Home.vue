<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card>
					<v-card-text>
						<p>Welcome to the Waves Metrics!</p>
						<p class="mb-0">{{ tooltip }}</p>
					</v-card-text>
				</v-card>
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