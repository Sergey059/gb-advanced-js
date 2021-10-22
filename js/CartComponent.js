Vue.component('cart', {
	props: ['cartItems', 'img', 'visibility'],
	template: `
		<div class="cart" v-show="visibility">
			<p class="cart-empty" v-if="!$root.cartItems.length">В корзине нет товаров</p>
			<ul class="cart-list">
				<cart-item v-for="item of cartItems" 
					:key="item.id_product"
					:img="img"
					:cart-item="item">
				</cart-item>
			</ul>
			<p class="cart-total">Итого: 
				<span class="total">{{ $root.totalPrice }}</span>
			</p>
		</div>
	`
});

Vue.component('cart-item', {
	props: ['img', 'cartItem'],
	template: `
		<li class="cart-item">
			<a href="#" class="cart-link">
				<img :src="img" :alt="cartItem.product_name" class="cart-img">
				<div class="cart-desc">
					<h4 class="cart-title">{{ cartItem.product_name }}</h4>
					<div class="cart-price-box">
						<p class="cart-price">{{ cartItem.price }} ₽</p>
						<p class="cart-quantity">{{ cartItem.quantity }}</p>
					</div>
				</div>
			</a>
			<button class="btn delete-btn" @click="$parent.$emit('remove', cartItem)">&#10006;</button>
		</li>
	`
})