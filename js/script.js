window.onload = function (){
	let output = document.querySelector('#output');
	let myform = document.querySelector('#my_form');
	
function addEvent(elem, type, code){
	if(elem.addEventListener){
	  elem.addEventListener(type, code, false);
	} else {
	  elem.attachEvent('on'+type, code);
	}
	return false;
  }
// Функция Ajax-запроса
function sendAjaxRequest(e){
	let evt = e || window.event;
	// Отменяем стандартное действие формы по событию submit
	if(evt.preventDefault){
		evt.preventDefault();
	} else {
		evt.returnValue = false; // для IE старых версий
	}
	// получаем новый XMLHttpRequest-объект
	let xhr = new XMLHttpRequest();
	if(xhr){
		// формируем данные формы
		let elems = myform.elements, // все элементы формы
			url = myform.action, // путь к обработчику
		    params = [];
		for(let i = 0; i < elems.length; i++){
			let elName = elems[i].name; // имя текущего элемента (атрибут name)
			if(elName){ // если атрибут name присутствует
				params.push(elems[i].name + '=' + elems[i].value);
			}
		}
		xhr.open('POST', url, true); // открываем соединение
		// заголовки - для POST-запроса
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		
		xhr.onreadystatechange = function() { 
			if (xhr.status == 404) {
				console.log ("Requested URL is not found.");
			  } else if (xhr.status == 403) {
				console.log("Access denied.");
			  } else {
				console.log("status is " + xhr.status);}
		}
		// стартуем ajax-запрос
		xhr.send(params.join('&')); // для GET запроса - xhr.send(null);
	}
	return false;
}

// Инициализация после загрузки документа
	addEvent(myform, 'submit', sendAjaxRequest);
	return false;	
}