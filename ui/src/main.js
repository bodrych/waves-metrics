import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
// import dataInit from 'highcharts/modules/data'
// import exportDataInit from 'highcharts/modules/export-data'

exportingInit(Highcharts)
// dataInit(Highcharts)
// exportDataInit(Highcharts)

Vue.config.productionTip = false

Vue.use(HighchartsVue)

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
