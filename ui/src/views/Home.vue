<template>
	<v-container>
		<v-row>
			<v-col>
				<Chart/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
// @ is an alias to /src
import Chart from '@/components/Chart.vue'

export default {
  name: 'home',
  components: {
    Chart
  }
}
</script>