let menuElem = document.querySelector('.nav-item');
let subElem = document.querySelectorAll('.nav-item-submenu');
let arrow = document.querySelector('.arrow');
let slide = document.querySelectorAll('.slide');
let mobBtn = document.querySelector('.mob-descr');

menuElem.addEventListener('click', function(){
    for(i = 0; i < subElem.length; i++){
        if(subElem[i].style.opacity == 0){
            subElem[i].style.height = "40px";
            subElem[i].style.overflow = "viseble"
            subElem[i].style.opacity = "1";
            arrow.style.transform = "rotate(180deg)";
        }else if(subElem[i].style.opacity == 1){
            subElem[i].style.height = "0px";
            subElem[i].style.overflow = "hidden"
            subElem[i].style.opacity = "0";
            arrow.style.transform = "rotate(720deg)";
        }
    }
});

mobBtn.addEventListener('click', function(){
	let slideDescr = document.querySelectorAll('.descr-name');
	for(i=0; i < slideDescr.length; i++){
		if(document.querySelectorAll('.item-block')[i].classList.contains('item-block-active')){
			if (slideDescr[i].style.opacity == 0){
				slideDescr[i].style.opacity = '1';
				slideDescr[i].style.overflow = 'visible';
				slideDescr[i].style.height = '200px';
			}else if(slideDescr[i].style.opacity == 1){
					slideDescr[i].style.opacity = 0;
					slideDescr[i].style.overflow = 'hidden';
					slideDescr[i].style.height = '0px';
			}
		}
	}
});







let items = document.querySelectorAll('.item-block');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('item-block-active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('item-block-next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('item-block-next', direction);
		this.classList.add('item-block-active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.button-slide-left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.button-slide-right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

let link = document.querySelectorAll('.link');

for(let i = 0; i < link.length; i++){
	link[i].addEventListener('click', function(){
		document.querySelector("iframe").style.height = 100 +"%";
	document.querySelector('.wrapper').style.display = 'none';
	document.querySelector('.fix-btn-back').style.display = 'block'
	document.querySelector('.fix-btn-mob').style.display = 'block'
})
}

document.querySelector('.fix-btn-back').addEventListener('click', function(){
	document.querySelector("iframe").style.height = 0 + "%";
	document.querySelector('.fix-btn-back').style.display = 'none';
	document.querySelector('.fix-btn-mob').style.display = 'none';
	document.querySelector('.wrapper').style.display = 'block';
	document.querySelector('iframe').setAttribute('src', '');
});

let btnChange = document.querySelector('.fix-btn-mob');
	btnChange.addEventListener('click', function() {
		document.querySelector('iframe').classList.toggle('iframe');
		if(btnChange.firstChild.data == 'Mobile'){
			btnChange.firstChild.data = 'Desctop';
		}else{
			btnChange.firstChild.data = "Mobile";
		}
})


const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchStart', function(e){
		distX = 0;
		distY = 0;
		for(i = 0; i < slideDescr.length; i++){
			if(slideDescr[i].style.opacity == 0){
				slideDescr[i].style.opacity = '1'
				slideDescr[i].style.overflow = "viseble"
				slideDescr[i].style.height = "200px";
				slideDescr[i].style.position = "absolute";
			}else if(slideDescr[i].style.opacity == 1){
				slideDescr[i].style.opacity = '0'
				slideDescr[i].style.overflow = "hidden"
				slideDescr[i].style.height = "0px";
				slideDescr[i].style.position = "absolute";
			}
		}

	})


	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('button-arrow') || e.target.classList.contains('button-slide') || e.target.classList.contains('arrow-img')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;

			if( elapsedTime < 120){
				if(e.target.classList.contains('button-arrow') || e.target.classList.contains('button-slide') || e.target.classList.contains('arrow-img')){

				}
				else{
				document.querySelector('.wrapper').style.display = 'none';
				document.querySelector('.fix-btn-back').style.display = 'block'
				document.querySelector('.fix-btn-mob').style.display = 'block'
				let slideDescr = document.querySelectorAll('.descr-name');
				for(i=0; i < slideDescr.length; i++){
					if(document.querySelectorAll('.item-block')[i].classList.contains('item-block-active')){
						document.querySelector('iframe').setAttribute('src', document.querySelectorAll('.link')[i].getAttribute('href'));
					}
				}
			}
			}
			else if (elapsedTime <= allowedTime){

					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

var el = document.querySelector('.slider');
swipedetect(el);



