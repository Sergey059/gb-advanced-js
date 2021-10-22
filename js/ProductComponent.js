Vue.component('products', {
	props: ['products', 'img'],
	template: `
		<div class="products">
			<product v-for="item of products" 
				:key="item.id_product" 
				:img="img"
				:product="item">
			</product>
		</div>
	`
});
Vue.component('product', {
	props: ['product', 'img'],
	template: `
		<div class="product-item">
			<img :src="img" :alt="product.product_name" class="product-img">
			<div class="product-desc">
				<h3 class="product-title">{{product.product_name}}</h3>
				<p class="product-price">{{product.price}}</p>
				<button class="btn buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
			</div>
		</div>
	`
})