//LOADS THE PAGE OR REFRESHES TO SEE WHAT CONTENT SHOULD BE LOADED
var loadPage = function(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/');
	xhr.addEventListener('load', function(){
		var person = JSON.parse(xhr.responseText);
		console.log(person);
		if(Object.keys(person).length === 1){
			generateContent(person);
		}
		else{
			generateInput();
		}
})
	xhr.send();
}


loadPage();

//GENERATES THE USER INPUT BOXES
var generateInput = function(){
	var body = document.querySelector('body');
	var section = document.createElement('section');
	section.id = "content";
	body.appendChild(section);

	var name = document.createElement('input');
	name.type = 'text';
	name.id = 'name';
	name.placeholder = 'your name';
	section.appendChild(name);

	var hometown = document.createElement('input');
	hometown.type = 'text';
	hometown.id = 'hometown';
	hometown.placeholder = 'your hometown';
	section.appendChild(hometown);

	var sign = document.createElement('input');
	sign.type = 'text';
	sign.id = 'sign';
	sign.placeholder = 'your sign';
	section.appendChild(sign);

	var button = document.createElement('button')
	button.id = 'createUser';
	button.innerText = 'Add It!'
	section.appendChild(button)

	//CREATE USER BUTTON TRIGGER
	button.addEventListener('click', function(){
	var name_input = document.getElementById('name');
	var hometown_input = document.getElementById('hometown');
	var sign_input = document.getElementById('sign');

	var input_content = document.getElementById('content');

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000/person');
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	xhr.addEventListener('load', function(){
			deleteInput() 
	});
	var newUser = {name: name_input.value, hometown: hometown_input.value, sign: sign_input.value};
	xhr.send(JSON.stringify(newUser));

})

}

//DELETES THE INPUT BOXES ON THE PAGE AFTER THE INFO IS SUBMITED
var deleteInput = function(){
	var body = document.querySelector('body');
	var section = document.getElementById('content')
	body.removeChild(section);
	loadPage()
}


//GENERATES THE CONTENT ON THE PAGE
var generateContent = function(person){
	var body = document.querySelector('body');
	var section = document.createElement('section');
	section.id = "section_content"
	body.appendChild(section);

	var ul = document.createElement('ul');
	section.appendChild(ul);

	var name = document.createElement('li');
	name.innerText = person[0].name;
	ul.appendChild(name);
	var hometown = document.createElement('li');
	hometown.innerText = person[0].hometown;
	ul.appendChild(hometown);
	var sign = document.createElement('li');
	sign.innerText = person[0].sign;
	ul.appendChild(sign);

	var button = document.createElement('button');
	button.id = "delete_button";
	button.innerText = "Delete";
	section.appendChild(button);
	button.addEventListener('click', deletePerson);
}


//DELETES FROM THE SERVER
var deletePerson = function(){
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'http://localhost:3000/person');
	xhr.addEventListener('load', function(){
		deleteContent();
	});
	xhr.send();
}

//DELETES THE CONTENT ON THE PAGE
var deleteContent = function(){
	var body = document.querySelector('body');
	var section = document.querySelector('section');
	body.removeChild(section);
	loadPage()
}

