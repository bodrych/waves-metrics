<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<ChartPool/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import ChartPool from '@/components/ChartPool.vue'

	export default {
		name: 'peers',
		components: {
			ChartPool,
		},
	}
</script>