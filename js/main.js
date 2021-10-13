'use strict'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList{
	constructor(container='.products'){
		this.container = container;
		this.goods = [];//массив товаров из JSON документа
		this.#getProducts()
			.then(data => { //data - объект js
				this.goods = data;
				this.render()
			});
	}
	#getProducts(){
		return fetch(`${API}/catalogData.json`)
			.then(result => result.json())
			.catch(error => {console.log(error)})
	}
	render(){
		const block = document.querySelector(this.container);
		for(let product of this.goods){
			const item = new ProductItem(product);
			block.insertAdjacentHTML("beforeend",item.render());
		}
	}
}

class ProductItem{
	constructor(product, img = 'https://via.placeholder.com/200x150'){
		this.title = product.product_name;
		this.id = product.id_product;
		this.price = product.price;
		this.src = img;
	}
	render(){
		return `<div class="product-item" data-id=${this.id}>
							<img src=${this.src} class="product-img">
							<div class="product-desc">
								<h3 class="product-title">${this.title}</h3>
								<p class="product-price">${this.price} ₽</p>
								<button class="btn buy-btn">Добавить в корзину</button>
							</div>
						</div>`
	}
}


class Cart{
	constructor(container='.cart-list'){
		this.container = container;
		this.goods = []
		this.#getCartProducts()
			.then(data => {
				this.goods = data;
				this.render();
			});
	}
	#getCartProducts(){
		return fetch(`${API}/getBasket.json`)
			.then(result => result.json())
			.catch(error => {console.log(error)})
	}
	render(){
		const blockCart = document.querySelector(this.container);
		for(let product of this.goods.contents){
			const itemCart = new CartItem(product);
			blockCart.insertAdjacentHTML("beforeend", itemCart.render());
		}
		this.quantityProductsCart();
		this.totalPriceCart();
	}
	//добавления товара в корзину
	addProductToCart() {}
	//удаление товара из корзины
	deleteProductFromCart() {}
	//Количество товаров в корзине
	quantityProductsCart() {
		let productsCartLength = document.querySelector(this.container).children.length;
		document.querySelector('.quantity').textContent = productsCartLength;
	}
	//Общая цена товаров в корзине
	totalPriceCart() {
		let totalPrice = document.querySelector('.total'); 
		let sum = 0;
		for(let product of this.goods.contents){
			sum += product.price * product.quantity;
		}
		totalPrice.textContent = `${sum} ₽`;
	}
}

class CartItem{
	constructor(product, img = 'https://via.placeholder.com/200x150'){
		this.title = product.product_name;
		this.id = product.id_product;
		this.price = product.price;
		this.quantity = product.quantity;
		this.src = img;
	}
	render(){
		return `<li class="cart-item" data-id=${this.id}>
							<a href="#" class="cart-link">
								<img src=${this.src} alt="${this.title}" class="cart-img">
								<div class="cart-desc">
									<h4 class="cart-title">${this.title}</h4>
									<div class="cart-price-box">
										<p class="cart-price">${this.price} ₽</p>
										<p class="cart-quantity">${this.quantity}</p>
									</div>
								</div>
							</a>
							<button class="btn delete-btn">&#10006;</button>
						</li>`
	}
}


let list = new ProductList();
let cart = new Cart();
