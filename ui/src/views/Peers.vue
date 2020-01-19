<template>
	<v-container>
		<v-row>
			<v-col cols="12">
        <v-card>
					<v-card-text>
						<ChartPeers/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import ChartPeers from '@/components/ChartPeers.vue'

	export default {
		name: 'peers',
		components: {
			ChartPeers,
		},
	}
</script>