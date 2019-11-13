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
	
	/**
	 * @ Set popover position on resize
	 */
	window.addEventListener('resize', () => {
		if (currentDropdown) {
			setPosition(currentDropdown);
		}
	});

	/**
	 * @ Set popover position on scroll
	 */
	window.addEventListener('scroll', () => {
		if (currentDropdown) {
			setPosition(currentDropdown);
		}
	});

	/**
	 * @ Fetch points data locally
	 */
	axios.get('js/data/data.json').then(res => {
		pointsData = res.data;
	});

	/**
	 * @ Loop all buttons
	 */
	buttonsArray.forEach((item, index) => {

		/**
		 * @ Add click event to each button
		 */
		item.addEventListener('click', (e) => {
			e.preventDefault();

			const _this = e.currentTarget;
			
			/**
			 * @ Give global access to current item
			 */
			currentDropdown = _this;
			
			/**
			 * @ Set popover position on click
			 */
			setPosition(_this);

			/**
			 * @ Remove active class to all siblings
			 */
			buttonsArray.map(innerItem => {
				if (innerItem !== item) {
					innerItem.classList.remove('active');
				}
			});

			/**
			 * @ Toggle active class
			 */
			_this.classList.toggle('active');
			
			/**
			 * @ Get the current clicked point and match it with the fetched data
			 */
			const currentPoint = pointsData.find((pointItem, pointIndex) => pointIndex === index);
			
			/**
			 * @ Display the popover if current point has active class
			 */
			if ( _this.classList.contains('active') ) {
				popoverContainer.innerHTML = template(pointTemplate, currentPoint);
			} else {
				popoverContainer.innerHTML = '';
			}
		});
		
		/**
		 * @ Remove popover on document click
		 */
		document.addEventListener('click', (e) => {
			if (!e.target.closest('.point') && !e.target.closest('.popover')) {
				buttonsArray.map(item => item.classList.remove('active'));

				popoverContainer.innerHTML = '';
			}
		});
	});
}

// Function for changing Images on Header
let sliderHome = () => {
	let wrapper = Array.prototype.slice.call(document.querySelectorAll('.slide'));
	let numbers = Array.prototype.slice.call(document.querySelectorAll('.liNumber'));
	// Index for Counting slides
	let index = 0;
	// checking for ANY active slides
	let checkOpenSliders = () =>{
		wrapper.forEach(slider => {
			if(slider.classList && slider.classList.contains('active-list')){
				slider.classList.remove('active-list');
			}
		})
	}
	// Event Listener for clicked number
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
	// Function for changing slides auto
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
// Slider with testimonials
let responsiveSlider = () => {
	const target = document.querySelector('#testimonials');
	const container = document.querySelector('#slideWrap');
	const prevBtn 		= document.querySelector('#prev');
	const nextBtn 		= document.querySelector('#next');
	// pagination
	const totalItems 	= container.querySelectorAll('.carousel-item').length;
	const percent 		= (100 / totalItems);
	let currentIndex = 0;

	// Function for next Slide
	let next = (e) => {
		slideTo(currentIndex + 1);
		e.preventDefault();
	}
	// Function for prev Slide
	let prev = (e) => {
		slideTo(currentIndex - 1);
		e.preventDefault();
	}

	// Function for calc the Index Postion
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


// Language Dropdown
let language = ev => {
	const btnLang = document.querySelector('.language');
	// function if its clicked outside to remove class
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

// Currency Dropdown
let currency = el => {
	const btnCur = document.querySelector('.currency');
	// function if its clicked outside to remove class
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



// Open Modal Shopping
const openModalShopping = () => {
	const target = document.querySelector('#btnCart');
	const module = document.querySelector('#modalShoppingCart');
	target.addEventListener('click', e => {
		module.classList.add('shopping-open');
	});
}
// Close Modal Shopping
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

//  modal login
const loginDropdown = () => {
	const target = document.querySelector('#login');
	const dropdown = document.querySelector('.login-dropdown');

	// checking if its outside dropdown
	let outsideDropdown = event => {
		// Checking if its not inside dropdow AND its not the icon
		if(!event.target.closest('.login-dropdown') && !event.target.closest('#login')){
			dropdown.classList.remove('login-active');
		} // checking if its the icon and toggling the class
		else if(event.target.closest('#login')){
			dropdown.classList.toggle('login-active');
		}
	}
	document.addEventListener('click', outsideDropdown)
}

// Mobile Footer Triggering Dropdown
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

// Mobile Nav Dropdown
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
			// Filtering to close the other dropdown
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
// Changind grid/list view
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

// counting items loaded
let countItems = () =>{
	const target 	= document.querySelectorAll('.item').length;
	const span 		= document.querySelector('#numberOfItems');
	const active    = document.querySelector('.active-showing');
	const numbers 	= [].slice.call(document.querySelectorAll('.pagination'))
	span.innerHTML = target;


	if(active){
		// if its 1-6
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

// Function to Sort the Items Hight To Low
const filterHtoL = () => {
	const products = Array.from(document.querySelectorAll('[data-price]'), function(product) { 
        return { name: Number(product.dataset.price), element: product }
  	});
	const sortedProducts = products.sort((a, b) => a.name < b.name ? 1 : -1);
  	sortedProducts.forEach((product, i) => product.element.style.order = i);
  	
}
// Function to sort the Items Low To High
const filterLtoH = () => {
	const products = Array.from(document.querySelectorAll('[data-price]'), function(product) { 
        return { name: Number(product.dataset.price), element: product }
  	});
	const sortedProducts = products.sort((a, b) => a.name > b.name ? 1 : -1);
  	sortedProducts.forEach((product, i) => product.element.style.order = i);

}

//  Function to sort them in Alphabetical order A-Z
const filterAtoZ = () => {
	const products = Array.from(document.querySelectorAll('[data-name]'), function(product) { 
        return { name: product.dataset.name, element: product }
  	});
  	// Sorting the Object to Z-A order
	const sortedProducts = products.sort((a, b) => a.name > b.name ? 1 : -1);
	// Styling it to the order that the array has
	// sortedProducts.forEach((product, i) => product.element.style.order = i);
	for(var i = 0 ; i < sortedProducts.length ; i++){
		sortedProducts[i].element.style.order = i;
	}
}

//  Function to sort them in Desc-Alphabetical order Z-A
const filterZtoA = () => {
	const products = Array.from(document.querySelectorAll('[data-name]'), function(product) { 
        return { name: product.dataset.name, element: product }
  	});
  	// Sorting the Object to Z-A order
	const sortedProducts = products.sort((a, b) => a.name < b.name ? 1 : -1);
	// Styling it to the order that the array has
	sortedProducts.forEach((product, i) => product.element.style.order = i);
}


// Opening the Filter Options 
let filterDropdown = () => {
	const btn = document.querySelector('#btnFilter');
	const dropdown = document.querySelector('.filter-dropdown');
	const linkAtoZ = document.querySelector('#name-az');
	const linkZtoA = document.querySelector('#name-za');
	const linkLtoH = document.querySelector('#low-high');
	const linkHtoL = document.querySelector('#high-low');
	let uiChange = document.querySelector('#change');

	 //Event listener to trigger the dropdown 
	document.addEventListener('click', el => {
		if(el.target.closest('#btnFilter') == btn || el.target.closest('.filter-dropdown')){
			dropdown.classList.add('filter-dropdown-active');
			// Checking if the Dropdown is Opened
			if(dropdown.classList && dropdown.classList.contains('filter-dropdown-active')){
				// Adding event listener for each of the links
				const arr = [].slice.call(document.querySelectorAll('.filter-link'));
				arr.forEach(item => {
					item.addEventListener('click', e => {
						// Removed other active classes
						removingActive();
						// Added the new active class
						item.classList.add('filter-link-active');

						// Applying function Hight To Low
						if(linkHtoL.classList && linkHtoL.classList.contains('filter-link-active')){
							filterHtoL();
						} else if(linkLtoH.classList && linkLtoH.classList.contains('filter-link-active')){
							filterLtoH();
						} else if(linkAtoZ.classList && linkAtoZ.classList.contains('filter-link-active')){
							filterAtoZ();
						} else if(linkZtoA.classList && linkZtoA.classList.contains('filter-link-active')){
							filterZtoA();
						}
						// Changing the Active State of Dropdown
						uiChange.innerHTML = item.innerHTML

						// Preventing the Default of Anchor
						e.preventDefault();
					});
					// Function for removing all active links
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
		// If you click outside remove the active state
		else if(!el.target.closest('#btnFilter')){
			dropdown.classList.remove('filter-dropdown-active');
		}
	});
}

// Validating Email Function
function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

// Validate Footer Form Email
function validateFooterInput(){
	const btn = document.querySelector('.btn--newsletter');
	let result = '';
	// Event listener to Subscribe
	btn.addEventListener('click', e => {
	let email = document.querySelector('.newsletter input').value;
		if(validateEmail(email)){
			alert("You've subscribed succesfully!")
		}else{
			alert("Please enter a valid email address")
		}
		// Preventing default of button
		e.preventDefault();
	})
}

// Validating ContactUs Form
let validateContactForm = () => {
	const btn = document.querySelector('.section-contactUs .btn--form');

	btn.addEventListener('click', e =>{	
		let inputEmail = document.querySelector('#contactEmail');
		let inputMessage = document.querySelector('#contactMessage');
		const errorEmail = document.querySelector('.error-email');
		const errorMsg = document.querySelector('.error-msg');
		const success = document.querySelector('.succesfull-form');

		// Function to Clear excisting errors 
		function errors() {
			if(validateEmail(inputEmail.value)){
				errorEmail.classList.remove('error-email-active');
			}
			if(inputMessage.value != ''){
				errorMsg.classList.remove('error-msg-active');
			}
		}
		errors();

			// Checking if both of the * sections are empty
			if(inputEmail.value == '' && inputMessage.value == ''){
				errorEmail.classList.add('error-email-active');
				errorMsg.classList.add('error-msg-active');
			}
			else if(inputEmail.value == ''){
				errorEmail.classList.add('error-email-active');
			}
			else if(inputMessage.value == ''){
				errorMsg.classList.add('error-msg-active');
			}
			// If both of them are not empty execute further
			if(inputEmail.value != '' && inputMessage.value != ''){
				if(validateEmail(inputEmail.value)){
					success.classList.add('succesfull-form-active');

					// Function to remove the message in 5s
					setTimeout( e => {
						success.classList.remove('succesfull-form-active');
					}, 5000)

					// Reseting the form inputs
					inputMessage.value = '';
					inputEmail.value = ''
				}
				// If the email is not valid
				else if(!validateEmail(inputEmail.value)){
					errorEmail.classList.add('error-email-active');
				}
			}

		e.preventDefault();
	});
}

// FAQ Dropdown
const faqDropdown = () => {
	const arr = [].slice.call(document.querySelectorAll('.faq-link'))
	arr.forEach(item => {
		item.addEventListener('click', e => {
			item.classList.toggle('faq-link-active');
		});
	});
}

// Popovers // Points
function point(el){
	// Function to remove the other points with active state
	function removeActive(){
		const arr = [].slice.call(document.querySelectorAll('.popover'));

		arr.forEach(item => {
			if(item){
				item.classList.remove('popover-active');
			}
		})
	}

	if(el.classList && el.classList.contains('point--helmet')){
		removeActive();
		document.querySelector('.point--helmet').classList.toggle('point-active');
		document.querySelector('.popover-helmet').classList.toggle('popover-active');
	}else if(el.classList && el.classList.contains('point--shorts')){
		removeActive();
		document.querySelector('.point--shorts').classList.toggle('point-active');
		document.querySelector('.popover-shorts').classList.toggle('popover-active');
	}else if(el.classList && el.classList.contains('point--gloves')){
		removeActive();
		document.querySelector('.point--gloves').classList.toggle('point-active');
		document.querySelector('.popover-gloves').classList.toggle('popover-active');
	}else if(el.classList && el.classList.contains('point--bike')){
		removeActive();
		document.querySelector('.point--bike').classList.toggle('point-active');
		document.querySelector('.popover-bike').classList.toggle('popover-active');
	}else if(el.classList && el.classList.contains('point--water')){
		removeActive();
		document.querySelector('.point--water').classList.toggle('point-active');
		document.querySelector('.popover-water').classList.toggle('popover-active');
	}else if(el.classList && el.classList.contains('point--light')){
		removeActive();
		document.querySelector('.point--light').classList.toggle('point-active');
		document.querySelector('.popover-light').classList.toggle('popover-active');
	}else if(el.classList && el.classList.contains('point--bag')){
		removeActive();
		document.querySelector('.point--bag').classList.toggle('point-active');
		document.querySelector('.popover-bag').classList.toggle('popover-active');
	}
}

// Function for Register form
let chooseSex = () => {
	// Declare Variables
	let items 		= [].slice.call(document.querySelectorAll('.indicator-radio'));
	let buttons 	= [].slice.call(document.querySelectorAll('.custom-radio'));

	buttons[0].addEventListener('click', () => {
		items[1].classList.remove('indicator-active');
		items[0].classList.add('indicator-active');
	});
	buttons[1].addEventListener('click', () => {
		items[0].classList.remove('indicator-active');
		items[1].classList.add('indicator-active');
	});
}
let chooseOffers = () => {
	// Declare Variables
	let items 		= [].slice.call(document.querySelectorAll('.checkbox-indicator'));
	let buttons 	= [].slice.call(document.querySelectorAll('.custom-checkbox'));

	buttons[0].addEventListener('click', () => {
		items[0].classList.add('checkbox-active');
	})
	buttons[1].addEventListener('click', () => {
		items[1].classList.add('checkbox-active');
	})
}

// Function for Shopping List Listing
// If the items are more than 9 
let checkboxes = () => {
	// Declaring Variables
	let availabilityAndBrands = [].slice.call(document.querySelectorAll('.checkbox-label'));
	let prices = [].slice.call(document.querySelectorAll('.radio-label'));
	// For every item incl the text
	availabilityAndBrands.forEach(button => {
		// Adding event listener to assign it with active class
		button.addEventListener('click', () => {
			button.querySelector('.custom-control-indicator').classList.toggle('indicator-active');
		});
	});
	prices.forEach(button => {
		button.addEventListener('click', () => {
			// Function for removing classes
			// As the buttons are radio
			// Only 1 can be selected
			function removeClasses(){
				prices.forEach(item => {
					item.querySelector('.custom-control-indicator').classList.remove('indicator-active');
				});
			}
			removeClasses();
			button.querySelector('.custom-control-indicator').classList.toggle('indicator-active');
		})
	})
}

// Pagination if the elements are larger than 6
let shoppingPagination = () => {
	// Declaring Variables
	let numbers = [].slice.call(document.querySelectorAll('.pagination'));
	let items = [].slice.call(document.querySelectorAll('.item'));
	let scrollTop = document.querySelector('.section');

	// Onload allow the first 6 items to show
	if(numbers[0].innerHTML == 1){
		for(var x = 0; x < 6 ; x++) {
			items[x].classList.remove('item-nonactive');
			items[x].classList.add('item-active');
		}
	}
	// Javascript Plugin from Vendor
	var scroll = new SmoothScroll();
	// Onclick adding classname on numbers
	numbers.forEach(el => {
		el.addEventListener('click', () => {

		// Onclick scroll it back to top
		scroll.animateScroll( scrollTop );
			// Removing the other active classes
			numbers.forEach(item => {
				item.classList.remove('pagination-active');
			});
			// Add class on the one thats clicked
			el.classList.add('pagination-active');
			// Trigger the function to show new content
			shoppingPage();
		});
	});

	let shoppingPage = () => {
		// Footer counting how many items are showing
		let counterSpan = document.querySelector('.active-showing');
		// Following which page it is and only 6 to display
		numbers.forEach(number => {
			if(number.classList && number.classList.contains('pagination-active') && number.innerHTML == '1'){
				hideShoppingItems();
				counterSpan.innerHTML = '1 - 6 out of';
				for(var i = 0; i < 6 ; i++){
					items[i].classList.remove('item-nonactive');
					items[i].classList.add('item-active');
				}
			}else if(number.classList && number.classList.contains('pagination-active') && number.innerHTML == '2'){
				hideShoppingItems();
				counterSpan.innerHTML = '6 - 12 out of';
				for(var i = 6; i < 12 ; i++){
					items[i].classList.remove('item-nonactive');
					items[i].classList.add('item-active');;
				}
			}
			else if(number.classList && number.classList.contains('pagination-active') && number.innerHTML == '3'){
				hideShoppingItems();
				counterSpan.innerHTML = '12 - 18 out of';
				for(var i = 12; i < items.length ; i++){
					items[i].classList.remove('item-nonactive');
					items[i].classList.add('item-active');
				}
			}
		});
	}
}

// hiding all shopping items
let hideShoppingItems = () => {
	if(document.querySelector('.pagination')){
		let items = [].slice.call(document.querySelectorAll('.item'))
		items.forEach(box => {
			box.classList.add('item-nonactive');
			box.classList.remove('item-active');
		})	
	}	
}

// Dropdown for SITEMAP PAGE
let dropdownSitemap = () => {
	// Declaring variables
	const arr = [].slice.call(document.querySelectorAll('.sitemap-head'));

	arr.forEach(item => {
		item.addEventListener('click', (e) => {
			item.childNodes[4].classList.toggle('dropdown-active');
			item.childNodes[1].childNodes[1].classList.toggle('active-rotate');
		});
	});
}

// Change the items-horizontal only option on Mobile
const mediaMobileView = () => {
	const x 		 = window.matchMedia("(max-width: 500px)");
	const items 	 = document.querySelectorAll('.item');
	const itemsArray = Array.from(items);

	
	const triggerFunction = (x) => {
		if(x.matches){
			itemsArray.forEach(el => {
				el.classList.add('item-horizontal');
			});
		}else{
			itemsArray.forEach(el => {
				el.classList.remove('item-horizontal');
			});
		}
	}
	// Calling it
	triggerFunction(x);
	// Attaching to listener Change
	x.addListener(triggerFunction);
}


window.onload = function(){
	if(document.querySelector('.sitemap-head')){
		dropdownSitemap();
	}
	if(document.querySelector('.item')){
		mediaMobileView();
	}
	if(document.querySelector('.pagination')){
		hideShoppingItems();
		shoppingPagination();
	}
	if(document.querySelector('.checkbox-label')){
		checkboxes();
	}
	if(document.querySelector('.checkbox-indicator')){
		chooseOffers();
	}
	if(document.querySelector('.indicator-radio')){
		chooseSex();
	}
	if(document.querySelector('#testimonials')){
		responsiveSlider();
	}
	if(document.querySelector('.slide')){
		sliderHome();
	}
	if(document.querySelector('#view-grid')){
		viewList();
	}
	if(document.querySelector('#numberOfItems')){
		countItems();
	}
	if(document.querySelector('.filter-dropdown')){
		filterDropdown();
	}
	if(document.querySelector('#contactEmail')){
		validateContactForm();
	}
	if(document.querySelector('.section-faq')){
		faqDropdown();
	}
	pageLinks();
	language();
	currency();
	openModalShopping();
	closeModalShopping();
	loginDropdown();
	mobileFooter();
	mobileNavDropdown();
	mobileNavTrigger();
	validateFooterInput();
	
	// /personal/bike-shop/
	if ( location.pathname === '/bike-shop/lookbook-inside.html') {
		dynamicPopover();
		console.log('don');
	} else {
		return
	}
}
