const product = {
	props: ['product', 'img'],
	template: `
		<div class="product-item">
			<img :src="img" :alt="product.product_name" class="product-img">
			<div class="product-desc">
				<h3 class="product-title">{{product.product_name}}</h3>
				<p class="product-price">{{product.price}}</p>
				<button class="btn buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
			</div>
		</div>
	`
}

const products = {
	components: {product},
	props: ['img'],
	data() {
		return {
			catalogUrl: '/catalogData.json',
			products: [],
			filtered: []
		}
	},
	mounted(){
		this.$parent.getJson(`${API + this.catalogUrl}`)
		.then(data => {
			for(let el of data){
				this.products.push(el);
				this.filtered.push(el);
			}
		});
		this.$parent.getJson(`getProducts.json`)
		.then(data => {
			for(let el of data){
				this.products.push(el);
				this.filtered.push(el);
			}
		})
	},
	filter(value){
		const regexp = new RegExp(value, 'i');
		this.filtered = this.products.filter(product => regexp.test(product.product_name));
	},
	template: `
		<div class="products">
			<product
				v-for="item of filtered"
				:key="item.id_product" 
				:img="$parent.imgCatalog"
				:product="item">
			</product>
		</div>
	`
};