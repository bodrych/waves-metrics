<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<ChartBalance/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import ChartBalance from '@/components/ChartBalance.vue'

	export default {
		name: 'peers',
		components: {
			ChartBalance,
		},
	}
</script>