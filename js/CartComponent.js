const CartItem = {
	props: ['img', 'cart_item'],
	template: `
		<li class="cart-item">
			<a href="#" class="cart-link">
				<img :src="img" :alt="cart_item.product_name" class="cart-img">
				<div class="cart-desc">
					<h4 class="cart-title">{{ cart_item.product_name }}</h4>
					<div class="cart-price-box">
						<p class="cart-price">{{ cart_item.price }} ₽</p>
						<p class="cart-quantity">{{ cart_item.quantity }}</p>
					</div>
				</div>
			</a>
			<button
				class="btn delete-btn"
				@click="$parent.remove(cart_item)"
			>
			&#10006;</button>
		</li>
	`
}

const cart = {
	components: {CartItem},
	props: ['img'],
	data(){
		return {
			cartUrl: '/getBasket.json',
			show: false,
			cartItems: []
		}
	},
	computed: {
		totalPrice() {
			return this.cartItems.reduce((acc, val) => acc + val.quantity * val.price, 0);
		},
	},
	methods:{
		addProduct(product){
			this.$parent.getJson(`${API}/addToBasket.json`)
			.then(data => {
				if(data.result === 1){
					let find = this.cartItems.find(el => el.id_product === product.id_product);
					if(find){
						find.quantity++;
					} else {
						const prod = Object.assign({quantity: 1}, product);
						this.cartItems.push(prod)
					}
				} else {
					console.log('Error');
				}
			})
		},
		remove(product){
			this.$parent.getJson(`${API}/deleteFromBasket.json`)
			.then(data => {
				if (data.result === 1) {
					if(product.quantity>1){
						product.quantity--;
					} else {
						this.cartItems.splice(this.cartItems.indexOf(product), 1);
					}
				}
			})
		}
	},
	mounted(){
		this.$parent.getJson(`${API + this.cartUrl}`)
		.then(data => {
			for(let el of data.contents){
				this.cartItems.push(el);
			}
		})
	},
	template: `
		<div>
			<button class="btn btn-cart" type="button" @click="show=!show">
				<i class="fas fa-shopping-basket"></i>
				<span class="quantity">{{cartItems.length}}</span>
			</button>

			<div class="cart" v-show="show">
				<p class="cart-empty" v-if="!cartItems.length">В корзине нет товаров</p>
				<ul class="cart-list">
					<CartItem v-for="item of cartItems" 
						:key="item.id_product"
						:img="$parent.imgCatalog"
						:cart_item="item">
					</CartItem>
				</ul>
				<p class="cart-total">Итого: 
					<span class="total">{{ totalPrice }}</span>
				</p>

			</div>
		</div>
	`
};


// :cart-items="cartItems"
// 						:img="imgCatalog"
// 						:visibility="show"
// 						@remove="remove"