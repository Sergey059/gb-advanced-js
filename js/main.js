'use strict'
let text = document.querySelectorAll('.text');
let btn = document.querySelector('.btn');
	btn.addEventListener('click', () => {
		text.forEach(el => {
			// Задание 1
			//------------------------
			// el.textContent = el.textContent.replace(/'/g, '"');

			//Задание 2
			//------------------------
			el.textContent = el.textContent.replace(/\B'|'\B/g, '"');
		});
});
