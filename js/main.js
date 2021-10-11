class ProductList{
	constructor(container='.products'){
		this.container = container;
		this.goods = [];
		this.#fetchProducts();
		this.render();//вывод товаров на страницу
		this.sumPrice();//подсчет общей цены товаров
	}

	#fetchProducts(){
		this.goods = [
			{id: 1, src:'../img/1.jpg', title: 'Notebook', price: 2000},
			{id: 2, src:'../img/2.jpg', title: 'Mouse', price: 20},
			{id: 3, src:'../img/3.jpg', title: 'Keyboard', price: 200},
			{id: 4, src:'../img/4.jpg', title: 'Gamepad', price: 50},
		];
	}
	
	render(){
		const block = document.querySelector(this.container);
		for(let product of this.goods){
			const item = new ProductItem(product);
			block.insertAdjacentHTML("beforeend",item.render());
		}
	}

	// ЗАДАНИЕ 2
	//--------------------------------------
	sumPrice(){
		let sum = 0;
		for(let product of this.goods){
			sum+=product.price;
		}
		console.log(sum);
	}
	
}

class ProductItem{
	constructor(product){
		this.title = product.title;
		this.id = product.id;
		this.price = product.price;
		this.src = product.src;
	}
	render(){
		return `<div class="product-item" data-id=${this.id}>
							<img src=${this.src} class="product-img">
							<div class="product-desc">
								<h3 class="product-title">${this.title}</h3>
								<p class="product-price">${this.price} руб.</p>
								<button class="btn buy-btn">Купить</button>
							</div>
						</div>`
	}
}

// ЗАДАНИЕ 1
//--------------------------------------
class Cart{

	//добавления товара в корзину
	addProductToCart() {}

	//удаление товара из корзины
	deleteProductFromCart() {}

	//Количество товаров в корзине
	quantityProductsCart() {}

	//Общая цена товаров в корзине
	totalPriceCart() {}

}

class CartItem{

	//разметка товара в корзине
	render(){}

}


let list = new ProductList();