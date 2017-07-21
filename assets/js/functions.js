function Gify() {
	this.apiKEY = '62b7c8fe352945ab958002bae159837b';
	this.category = 'banana';
	this.categories = ['banana', 'pug', 'car', 'cat']
	this.dataURL = `http://api.giphy.com/v1/gifs/search?q=${this.category}&api_key=${this.apiKEY}&limit=20`;
	this.object = {};
}

Gify.prototype.displayResults = function() {
	let gify = this;
	let i = 1;
	for(object in gify.object.data) {
		let stillImage = gify.object.data[object].images.original_still.url;
		let animatedImage = gify.object.data[object].images.original.url;
		let rating = gify.object.data[object].rating;
		let column = $('.ones');

		if(i === 1) {
			column = '.ones';
			i++;
		}else if(i === 2) {
			column = '.twos';
			i++;
		}else if(i === 3) {
			column = '.threes';
			i++;
		}else if(i === 4) {
			column = '.fours';
			i = 1;
		}

		$(column).append(

			`<div class="panel panel-default">
				<div class="panel-heading">
					<h3 id="Rating" class="panel-title">rated <span>${rating}</span></h3>
				</div>
				<div class="panel-body">
					<img class="img-responsive gify" src="${stillImage}" data-url="${animatedImage}">
				</div>
			</div>`
		);

	}
}

Gify.prototype.search = function() {
	let gify = this;
	gify.dataURL = `http://api.giphy.com/v1/gifs/search?q=${gify.category}&api_key=${gify.apiKEY}&limit=20`;
	$.ajax({
		url: gify.dataURL,
		method: 'GET'
	}).done(function(res) {
		gify.object = res;
		console.log(gify.object);
		$('.ones, .twos, .threes, .fours').empty();
		gify.displayResults();
	});
}

Gify.prototype.defaultCategories = function() {
	for(category in this.categories) {
		$('#Categories div').append(`<button class="category btn btn-default">${this.categories[category]}</button>`);
	}
}

Gify.prototype.addCategory = function() {
	let category = $('#NewCategory').val();

	if(this.categories.indexOf(category) === -1) {
		this.categories.push(category);
		$('#Categories div').append(`<button id="${category}" class="category btn btn-default">${category}</button>`);
		$('#NewCategory').val('');
	}else{
		$('#NewCategory').val('');
	}
}

Gify.prototype.events = function() {
	let gify = this;
	$(document).on('click', '.category', function() {
		gify.category = $(this).text();
		gify.search();
	});

	$(document).on('click', '#SubmitCategory', function(event) {
		event.preventDefault();
		gify.addCategory();
	});

	$(document).on('click', '.gify', function() {
		$(this).attr('src', ($(this).attr('data-url')));
	});
}

var gify = new Gify();

$(document).ready(function() {
	gify.defaultCategories();
	gify.events();
});