Vue.component('search', {
	props: ['filter'],
	template: `
		<form action="#" class="search-form" @submit.prevent="filter">
			<input type="text" class="search-field" v-model="$root.userSearch">
			<button class="btn btn-search" type="submit">
				<i class="fas fa-search"></i>
			</button>
		</form>
	`
});