function template(str, vars) {
	return str.replace(/{{([^}]+)}}/g, function(match, property) {
		var arr = property.split('.');
		var obj = vars[arr.shift()];
				
		while(arr.length > 0 && typeof obj === 'object') {
			obj = obj[arr.shift()];
			console.log(obj[arr.shift()]);
		};
		
		return typeof obj === 'undefined' ? match : obj;
	});
}

const dynamicPopover = () => {
	let pointsData = [];
	let currentDropdown;
	const buttonsNodeList = document.querySelectorAll('.point');
	const buttonsArray = Array.from(buttonsNodeList);
	const pointTemplate = document.getElementById('popover').innerHTML;
	const popoverContainer = document.getElementById('popover-container');
	const popoverContainerWidth = popoverContainer.clientWidth;
	
	const setPosition = (element) => {
		const elementClient = element.getBoundingClientRect();

		popoverContainer.setAttribute(`style`, `left: ${elementClient.left - popoverContainerWidth}px; top: ${elementClient.top - 12}px;`);
	}
	
	
	window.addEventListener('resize', () => {
		if (currentDropdown) {
			setPosition(currentDropdown);
		}
	});

	
	window.addEventListener('scroll', () => {
		if (currentDropdown) {
			setPosition(currentDropdown);
		}
	});

	axios.get('js/data/data.json').then(res => {
		pointsData = res.data;
	});

	
	buttonsArray.forEach((item, index) => {

		
		item.addEventListener('click', (e) => {
			e.preventDefault();

			const _this = e.currentTarget;
			
			
			currentDropdown = _this;
			
			setPosition(_this);

			
			buttonsArray.map(innerItem => {
				if (innerItem !== item) {
					innerItem.classList.remove('active');
				}
			});

			
			_this.classList.toggle('active');
			
			
			const currentPoint = pointsData.find((pointItem, pointIndex) => pointIndex === index);
			
			
			if ( _this.classList.contains('active') ) {
				popoverContainer.innerHTML = template(pointTemplate, currentPoint);
			} else {
				popoverContainer.innerHTML = '';
			}
		});
		
		document.addEventListener('click', (e) => {
			if (!e.target.closest('.point') && !e.target.closest('.popover')) {
				buttonsArray.map(item => item.classList.remove('active'));

				popoverContainer.innerHTML = '';
			}
		});
	});
}


let sliderHome = () => {
	let wrapper = Array.prototype.slice.call(document.querySelectorAll('.slide'));
	let numbers = Array.prototype.slice.call(document.querySelectorAll('.liNumber'));
	let index = 0;
	let checkOpenSliders = () =>{
		wrapper.forEach(slider => {
			if(slider.classList && slider.classList.contains('active-list')){
				slider.classList.remove('active-list');
			}
		})
	}
	
	numbers.forEach( e => {
		e.addEventListener('click', item => {
			if(e.innerHTML && e.innerHTML == '02'){
				checkOpenSliders();
				index = 1;
				wrapper[1].classList.add('active-list');
			} else if(e.innerHTML && e.innerHTML == '03'){
				checkOpenSliders();
				index = 2;
				wrapper[2].classList.add('active-list');
			} else if (e.innerHTML && e.innerHTML == '01'){
				index = 1;
				checkOpenSliders();
				wrapper[0].classList.add('active-list');
			}
		})
	});
	
	let changeSlides = () => {
		setInterval( e => {
			if(index === 0){
				index++;
				checkOpenSliders();
				wrapper[0].classList.add('active-list');
			}
			else if(index === 1){
				index++;
				checkOpenSliders();
				wrapper[1].classList.add('active-list');
			}
			else if(index == 2){
				index = 0;
				checkOpenSliders();
				wrapper[2].classList.add('active-list');
			}
		}, 5000);
	}
	changeSlides();
}

let responsiveSlider = () => {
	const target = document.querySelector('#testimonials');
	const container = document.querySelector('#slideWrap');
	const prevBtn 		= document.querySelector('#prev');
	const nextBtn 		= document.querySelector('#next');
	
	const totalItems 	= container.querySelectorAll('.carousel-item').length;
	const percent 		= (100 / totalItems);
	let currentIndex = 0;

	
	let next = (e) => {
		slideTo(currentIndex + 1);
		e.preventDefault();
	}
	
	let prev = (e) => {
		slideTo(currentIndex - 1);
		e.preventDefault();
	}

	
	function slideTo(index){
		if(index < 0) {
			index = totalItems - 1;
		}else if( index >= totalItems){
  			index = 0;
		}else{
			index = index;
		}
		container.style.WebkitTransform = container.style.transform = 'translate(-' + (index * percent) +'%, 0)';
		
		currentIndex = index;
	}
	prevBtn.addEventListener('click', prev, false);
	nextBtn.addEventListener('click', next, false);

}



let language = ev => {
	const btnLang = document.querySelector('.language');
	let clickedOutside = item => {
		if(!item.target.closest('.dropdown-language') && !item.target.closest('.language')){
			btnLang.childNodes[5].classList.remove('active-drop');
		}
	}
	btnLang.addEventListener('click', e => {
		btnLang.childNodes[5].classList.toggle('active-drop');
	})
	document.addEventListener('click', clickedOutside);
}


let currency = el => {
	const btnCur = document.querySelector('.currency');
	
	let clickedOutside = item => {
		if(!item.target.closest('.dropdown-language') && !item.target.closest('.currency')){
			btnCur.childNodes[5].classList.remove('active-drop');
		}
	}
	btnCur.addEventListener('click', e => {
		btnCur.childNodes[5].classList.toggle('active-drop');
	});
	document.addEventListener('click', clickedOutside);
}




const openModalShopping = () => {
	const target = document.querySelector('#btnCart');
	const module = document.querySelector('#modalShoppingCart');
	target.addEventListener('click', e => {
		module.classList.add('shopping-open');
	});
}

const closeModalShopping = () => {
	const target = document.querySelector('.close-modal-shopping');
	const module = document.querySelector('#modalShoppingCart');
	
	let clickOutside = elem => {
		if(!elem.target.closest('#modalShoppingCart') && !elem.target.closest('#btnCart') ){
			module.classList.remove('shopping-open');
		}else if(elem.target.closest('#btnCart')){
			module.classList.add('shopping-open');
		}else if(elem.target.closest('.close-modal-shopping')){
			module.classList.remove('shopping-open');
		}
	}
	document.addEventListener('click', clickOutside);
}


const loginDropdown = () => {
	const target = document.querySelector('#login');
	const dropdown = document.querySelector('.login-dropdown');

	
	let outsideDropdown = event => {
		if(!event.target.closest('.login-dropdown') && !event.target.closest('#login')){
			dropdown.classList.remove('login-active');
		} 
		else if(event.target.closest('#login')){
			dropdown.classList.toggle('login-active');
		}
	}
	document.addEventListener('click', outsideDropdown)
}


const mobileFooter = () => {
	const container = document.querySelectorAll('.footer-mobile-module');
	const array = Array.from(container);

	array.map((item, index) => {
		const button = item.querySelector('.link-module');

		button.addEventListener('click', (e) => {
			e.preventDefault();

			const dropdown = item.querySelector('.module-dropdown');

			array.map(innerItem => {
				if (innerItem !== item) {
					const innerDropdown = innerItem.querySelector('.module-dropdown');

					innerDropdown.classList.remove('module-open');
				}
			});

			dropdown.classList.contains('module-open') ? dropdown.classList.remove('module-open') : dropdown.classList.add('module-open');
		});
	});
}


const mobileNavDropdown = () => {
	const arr = [].slice.call(document.querySelectorAll('.mobile-item-with-dropdown'));

	const closeBefore = () => {
		arr.forEach(item => {
			if(item.childNodes[3].classList && item.childNodes[3].classList.contains('mobile-dropdown-active')){
				item.childNodes[3].classList.remove('mobile-dropdown-active');
			}
		});
	}

	arr.forEach(item => {
		item.addEventListener('click', e => {
			
			arr.forEach(link => {
				if(link != item && link.childNodes[3].classList && link.childNodes[3].classList.contains('mobile-dropdown-active')){
					link.childNodes[3].classList.remove('mobile-dropdown-active');
				}
			});
			e.target.closest('.mobile-item-with-dropdown').childNodes[3].classList.toggle('mobile-dropdown-active');
		});
	})
}

const mobileNavTrigger = () => {
	const trigger = document.querySelector('.mobile-nav-trigger');
	const modal   = document.querySelector('.mobile-nav');

	let triggerNav = e => {

		if(e.target.closest('.mobile-nav-trigger') || e.target.closest('.bar')){
			modal.classList.add('mobile-nav-active');
		}else if(!e.target.closest('.mobile-nav')){
			modal.classList.remove('mobile-nav-active');
		}

	}
	document.addEventListener('click', triggerNav);
}

const viewList = () => {
	const boxes 	= document.querySelectorAll('.item');
	const arr 		= [].slice.call(boxes);
	const btnGrid 	= document.querySelector('#view-grid');
	const btnList 	= document.querySelector('#view-list');
	const btns 		= [btnGrid, btnList];

	btns.forEach(ev => {
		ev.addEventListener('click', (e) => {
			e.preventDefault();

			if(ev === btnGrid){
				btnList.classList.remove('svg-active');
				btnGrid.classList.add('svg-active');
				arr.forEach(i => {
					i.classList.remove('item-horizontal');
				})
			}
			if(ev === btnList){
				btnGrid.classList.remove('svg-active');
				btnList.classList.add('svg-active');
				arr.forEach(i => {
					i.classList.add('item-horizontal');
				});			
			}
		});
	});
}

let countItems = () =>{
	const target 	= document.querySelectorAll('.item').length;
	const span 		= document.querySelector('#numberOfItems');
	const active    = document.querySelector('.active-showing');
	const numbers 	= [].slice.call(document.querySelectorAll('.pagination'))
	span.innerHTML = target;


	if(active){
		
		if(numbers[0].classList && numbers[0].classList.contains('pagination-active')){
			active.innerHTML = '1 - 6 out of';
		}
	}
}


const pageLinks = () => {

	const salesPage 	= document.querySelector('#link-sale');
	const home  		= document.querySelector('.header__logo');
 	const homeMobile 	= document.querySelector('.header__logo-mobile');
 	const lookbook 		= document.querySelector('.lookbook-box');
 	const lookbookLink  = document.querySelector('#lookbookLink');
 	const accessories   = document.querySelector('#apparelLink');
 	const registerLink  = document.querySelector('#registerLink');

 	if(registerLink){
 		registerLink.addEventListener('click', () => {
 			location.href = 'create-account.html';
 			console.log('clicked')
 		});
 	}
 	lookbookLink.addEventListener('click', () => {
 		location.href = 'lookbook.html';
 	});
 	accessories.addEventListener('click', () => {
 		location.href = 'accessories.html';
 	});
	salesPage.addEventListener('click', () => {
		location.href = "sales.html";
	});
	home.addEventListener('click', () => {
		location.href = 'index.html';
	});
	homeMobile.addEventListener('click', () => {
		location.href = 'index.html';
	});
	if(lookbook){
		lookbook.addEventListener('click', () => {
			location.href = 'lookbook-inside.html';
		});
	}
}

const filterHtoL = () => {
	const products = Array.from(document.querySelectorAll('[data-price]'), function(product) { 
        return { name: Number(product.dataset.price), element: product }
  	});
	const sortedProducts = products.sort((a, b) => a.name < b.name ? 1 : -1);
  	sortedProducts.forEach((product, i) => product.element.style.order = i);
  	
}
const filterLtoH = () => {
	const products = Array.from(document.querySelectorAll('[data-price]'), function(product) { 
        return { name: Number(product.dataset.price), element: product }
  	});
	const sortedProducts = products.sort((a, b) => a.name > b.name ? 1 : -1);
  	sortedProducts.forEach((product, i) => product.element.style.order = i);

}

const filterAtoZ = () => {
	const products = Array.from(document.querySelectorAll('[data-name]'), function(product) { 
        return { name: product.dataset.name, element: product }
  	});
	const sortedProducts = products.sort((a, b) => a.name > b.name ? 1 : -1);
	
	for(var i = 0 ; i < sortedProducts.length ; i++){
		sortedProducts[i].element.style.order = i;
	}
}

const filterZtoA = () => {
	const products = Array.from(document.querySelectorAll('[data-name]'), function(product) { 
        return { name: product.dataset.name, element: product }
  	});
	const sortedProducts = products.sort((a, b) => a.name < b.name ? 1 : -1);
	sortedProducts.forEach((product, i) => product.element.style.order = i);
}
 
let filterDropdown = () => {
	const btn = document.querySelector('#btnFilter');
	const dropdown = document.querySelector('.filter-dropdown');
	const linkAtoZ = document.querySelector('#name-az');
	const linkZtoA = document.querySelector('#name-za');
	const linkLtoH = document.querySelector('#low-high');
	const linkHtoL = document.querySelector('#high-low');
	let uiChange = document.querySelector('#change');

	
	document.addEventListener('click', el => {
		if(el.target.closest('#btnFilter') == btn || el.target.closest('.filter-dropdown')){
			dropdown.classList.add('filter-dropdown-active');
			if(dropdown.classList && dropdown.classList.contains('filter-dropdown-active')){
				const arr = [].slice.call(document.querySelectorAll('.filter-link'));
				arr.forEach(item => {
					item.addEventListener('click', e => {
						removingActive();
						item.classList.add('filter-link-active');
						if(linkHtoL.classList && linkHtoL.classList.contains('filter-link-active')){
							filterHtoL();
						} else if(linkLtoH.classList && linkLtoH.classList.contains('filter-link-active')){
							filterLtoH();
						} else if(linkAtoZ.classList && linkAtoZ.classList.contains('filter-link-active')){
							filterAtoZ();
						} else if(linkZtoA.classList && linkZtoA.classList.contains('filter-link-active')){
							filterZtoA();
						}
						
						uiChange.innerHTML = item.innerHTML
						e.preventDefault();
					});
					
					function removingActive(){
						arr.forEach(elem => {
							if(elem.classList && elem.classList.contains('filter-link-active')){
								elem.classList.remove('filter-link-active');
							}
						})					
					}
				})
			}
		}
		
		else if(!el.target.closest('#btnFilter')){
			dropdown.classList.remove('filter-dropdown-active');
		}
	});
}


function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

function validateFooterInput(){
	const btn = document.querySelector('.btn--newsletter');
	let result = '';
	
	btn.addEventListener('click', e => {
	let email = document.querySelector('.newsletter input').value;
		if(validateEmail(email)){
			alert("You've subscribed succesfully!")
		}else{
			alert("Please enter a valid email address")
		}
		e.preventDefault();
	})
}


