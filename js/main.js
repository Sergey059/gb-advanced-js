'use strict'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
	el: '#app',
	data: {
		imgCatalog: 'https://via.placeholder.com/200x150'
	},
	components: {products, cart, filter_el},
	methods: {
		getJson(url){
			return fetch(url)
				.then(result => result.json())
				.catch(error => console.log(error))
		},
	}
})