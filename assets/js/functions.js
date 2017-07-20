function Gify() {
	this.apiKEY = '62b7c8fe352945ab958002bae159837b';
	this.category = 'banana';
	this.categories = ['banana', 'pug', 'car', 'cat']
	this.dataURL = `http://api.giphy.com/v1/gifs/search?q=${this.category}&api_key=${this.apiKEY}&limit=25`;
	this.object = {};
}

Gify.prototype.search = function() {
	this.dataURL = `http://api.giphy.com/v1/gifs/search?q=${this.category}&api_key=${this.apiKEY}&limit=25`;
	$.ajax({
		url: this.dataURL,
		method: 'GET'
	}).done(function(res) {
		this.object = res;
		console.log(this.object);
	});
}

Gify.prototype.defaultCategories = function() {
	for(category in this.categories) {
		$('#Categories div').append(`<button class="category">${this.categories[category]}</button>`);
	}
}

Gify.prototype.addCategory = function() {
	let category = $('#NewCategory').val();

	if(this.categories.indexOf(category) === -1) {
		this.categories.push(category);
		$('#Categories div').append(`<button class="category">${category}</button>`);
		let self = this;
		$('.category').click(function() {
			self.category = $(this).text();
			self.search();
		});
		$('#NewCategory').val('');
	}else{
		$('#NewCategory').val('');
	}
}

var gify = new Gify();

$(document).ready(function() {
	gify.defaultCategories();
	$('.category').click(function() {
		gify.search();
	});
	$('#SubmitCategory').click(function(event) {
		event.preventDefault();
		//console.log('clicked');
		//gify.search();
		gify.addCategory();
	});
});