<template>
	<v-container>
		<v-row>
			<v-col>
				<status />
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="6" md="4">
				<v-card
					:to="{ name: 'balance' }"
				>
					<v-card-title>
						<span class="subtitle-1">Generating balance</span>
					</v-card-title>
					<v-card-text>
						<PreviewChartBalance/>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="4">
				<v-card
					:to="{ name: 'peers' }"
				>
					<v-card-title>
						<span class="subtitle-1">Number of nodes</span>
					</v-card-title>
					<v-card-text>
						<PreviewChartPeers/>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="6" md="4">
				<v-card
					:to="{ name: 'pool' }"
				>
					<v-card-title>
						<span class="subtitle-1">UTx-pool size</span>
					</v-card-title>
					<v-card-text>
						<PreviewChartPool/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import PreviewChartPool from '@/components/PreviewChartPool'
	import PreviewChartPeers from '@/components/PreviewChartPeers'
	import PreviewChartBalance from '@/components/PreviewChartBalance'
	import Status from '@/components/Status'

	export default {
		name: 'home',
		components: {
			PreviewChartPool,
			PreviewChartPeers,
			PreviewChartBalance,
			Status,
		},
		computed: {
		}
	}
</script>