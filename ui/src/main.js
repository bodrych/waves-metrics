import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import noDataToDisplayInit from 'highcharts/modules/no-data-to-display'
// import dataInit from 'highcharts/modules/data'
// import exportDataInit from 'highcharts/modules/export-data'
// import darkUnicaInit from 'highcharts/themes/dark-unica';

exportingInit(Highcharts)
noDataToDisplayInit(Highcharts)
// dataInit(Highcharts)
// exportDataInit(Highcharts)
// darkUnicaInit(Highcharts)

Vue.config.productionTip = false

Vue.use(HighchartsVue)

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
