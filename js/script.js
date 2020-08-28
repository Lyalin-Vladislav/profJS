
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
function makeGETRequest(metod, url, callback) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.response));
    }
  }

  xhr.open(metod, url);
  xhr.send();
}

makeGETRequest('GET', API, (data) => {console.log(data)});

const products = [
{ title: 'MANGO PEOPLE Сoat', pic: 'img/1657.png', price: 150 },
{ title: 'MANGO PEOPLE Сoat', pic: 'img/1877.png', price: 350 },
{ title: 'MANGO PEOPLE Jacket', pic: 'img/1907.png', price: 180 },
{ title: 'MANGO PEOPLE T-shirt', pic: 'img/1937.png', price: 20 },
{ title: 'MANGO PEOPLE Hoody', pic: 'img/1967.png', price: 80 },
{ title: 'MANGO PEOPLE Jacket', pic: 'img/1997.png', price: 100 },
{ title: 'MANGO PEOPLE Jacket', pic: 'img/2027.png', price: 90 },
{ title: 'MANGO PEOPLE Jacket', pic: 'img/2057.png', price: 120 },
{ title1: 'MANGO PEOPLE T-shirt', pic: 'img/2087.png', price1: 20 }
];


class ProductItem {
	constructor (title = 'product', pic = 'noVisible.jpg', price = 0){
		this.title = title;
		this.pic = pic;
		this.price = price;
	}
	render() {
		return `
			<div class="Product-pic-version">
				<a href="#" class="Product-pic-pic">
					<img src="${this.pic}" alt="pics">
				</a>
				<div class="Product-pic__shedow">
					<a href="#" class="Product-pic-card">
						<img class="Product-pic-card__img-move" src="img/fetured-pic/1287.png" alt="">
						<p class="Product-pic-card__p-move">Add to Card</p>
					</a>
					<a href="#" class="Product-pic-revers">
						<img src="img/fetured-pic/2075.png" alt="">
					</a>
					<a href="#" class="Product-pic-like">
						<img src="img/fetured-pic/2079.png" alt="" class="Product-pic-like__img">
					</a>
				</div>		
				<a href="#" class="Product-pic-content">${this.title}</a>
				<p class="paragraph">${this.price}</p>
			</div>
		`;
	}
}

class ProductList {
	construcror(){
		this.products = [];
	}

	fetchProduct(){
		this.products = products;
	}

	render(){
		let outHtml = '';		
			this.products.forEach( ({ title, pic, price }) => {
				const productItem = new ProductItem(title, pic, price);				
				outHtml += productItem.render();
			});		 
		document.querySelector(".Product-pic").innerHTML = outHtml;
	
	}
	
}

class Basket {
	constructor(title, pic, price) {
		this.title = title;
		this.pic = pic;
		this.price = price;
	}

	render(){
		return `
			<div class="basket_drop_menu_card">
				<img src="${this.pic}" height="85px" width="72px" alt="">
				<article>
					<h5>${this.title}</h5>
					<p class="single_star basket_single_star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></p>
					<div class="basket_drop_menu_value">
						<p>1</p>
						<p>x</p>
						<p>${this.price}</p>
					</div>
				</article>
				<a href="#" class="basket_drop_close"><i class="fas fa-times-circle"></i></a>
			</div>`;
	}
};

class ShowBasket {
	constructor(){
				
	}

	addProductBasket(element){		
		let parent = element.currentTarget;
		parent = parent.parentNode;
		parent = parent.parentNode;
		let pic = parent.children[0].children[0].src;
		let title = parent.children[2].innerHTML;
		let price = parent.children[3].innerHTML
		let httpOut = '';
		
		const basket = new Basket(title, pic, price);
		httpOut = basket.render();
		httpOut += document.querySelector('.basket_drop_menu').innerHTML
		document.querySelector('.basket_drop_menu').innerHTML = httpOut;
		let count = document.querySelector('.basket_point').innerHTML;
		document.querySelector('.basket_point').innerHTML = (parseInt(count) + 1);
		document.querySelector('.basket_drop_menu_total').children[1].innerHTML = showBasket.summBasket();
		let serchRemoveCard = document.querySelectorAll('.fas');
		serchRemoveCard.forEach(function (element) {element.addEventListener("click", showBasket.removeProductBasket);
					// statements
		});
		
	}
	removeProductBasket(element){		
		let parent = element.currentTarget;
		parent = parent.parentNode;
		parent = parent.parentNode;		
		parent.outerHTML = "";			
		let httpOut = '';		
		let count = document.querySelector('.basket_point').innerHTML;
		document.querySelector('.basket_point').innerHTML = (parseInt(count) - 1);
		document.querySelector('.basket_drop_menu_total').children[1].innerHTML = showBasket.summBasket();
		
	}

	summBasket(){
		let products = document.querySelectorAll('.basket_drop_menu_value');
		let totalCount = 0;		
		products.forEach( element => totalCount += element.children[0].innerHTML * element.children[2].innerHTML);
		return `$${totalCount}.00`;

	}

	moveToCard(){
		let serchAddCard = document.querySelectorAll('.Product-pic-card');
		serchAddCard.forEach(function (element) {element.addEventListener("click", showBasket.addProductBasket);
					// statements
		});		
	}
}

const productList = new ProductList();
productList.fetchProduct();
productList.render();
const showBasket = new ShowBasket();
showBasket.moveToCard();

