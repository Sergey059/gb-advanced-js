const products = [
	{id: 1, src:'../img/1.jpg', title: 'Notebook', price: 2000},
	{id: 2, src:'../img/2.jpg', title: 'Mouse', price: 20},
	{id: 3, src:'../img/3.jpg', title: 'Keyboard', price: 200},
	{id: 4, src:'../img/4.jpg', title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
	return `<div class="product-item" data-id=${product.id}>
						<img src=${product.src} class="product-img">
						<div class="product-desc">
							<h3 class="product-title">${product.title}</h3>
							<p class="product-price">${product.price} руб.</p>
							<button class="btn buy-btn">Купить</button>
						</div>
					</div>`
};
const renderPage = list => {
	const productsList = list.map(item => renderProduct(item));
	document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);