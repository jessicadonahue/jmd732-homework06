var mongoose = require('mongoose'), URLSlugs = require('mongoose-url-slugs');

// my schema goes here!
var Image = new mongoose.Schema({
	caption: String,
	url: String,
});

var ImagePost = new mongoose.Schema({
	title: String,
	images: [Image],
});

ImagePost.plugin(URLSlugs('title'));

//add the slug here

mongoose.model('Image', Image);
mongoose.model('ImagePost', ImagePost);


mongoose.connect('mongodb://localhost/hw06'); 