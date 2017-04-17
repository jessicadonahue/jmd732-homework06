var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ImagePost = mongoose.model('ImagePost');
var Image = mongoose.model('Image');


router.get('/image-posts', function(req, res, next) {

	ImagePost.find(function(err, imageposts, count) {

		res.render('image-posts', {imageposts: imageposts});

	});
});

router.post('/image-posts/add', function(req, res, next) {

	var i;
	var imageList = [Image];
	for (i = 1; i < 4; i++) {
		if (req.body['url' + i] !== "") {
			var currentImage = new Image({
				caption: req.body['caption' + i],
				url: req.body['url' + i]
			});

			imageList.push(currentImage);
		}
	}

	new ImagePost({

		title: req.body.title,
		images: imageList,
		
	}).save(function(err, imageposts, count) {
		res.redirect('/image-posts');
	});

});



router.get('/image-posts/:slug', function(req, res, next) {
	ImagePost.findOne({'slug' : req.params.slug}, function(err, imageposts, count) {
		res.render('image-posts-details', {imageposts: imageposts});

	});
	
});

router.post('/image-posts-add/:slug', function(req, res, next) {

	//now using the slug that we have in this url
	// we can find the document with this slug and update it
	//we can push the new image into the imagePosts
	
	
	ImagePost.findOneAndUpdate({slug: req.params.slug}, {$push: {images: {caption: req.body.caption, url: req.body.url}}}, function(err, imageposts, count) {
		
		var redirectLink = "/image-posts/" + req.params.slug;
		res.redirect(redirectLink);
	});



});

router.post('/image-posts-delete/:slug', function(req, res, next) {

	//find one to remove 
	ImagePost.findOne({slug: req.params.slug}, function(err, imageposts, count) {
		if (Array.isArray(req.body.deletePics)) {
			for (imageId in req.body.deletePics) {

				imageposts.images.id(req.body.deletePics[imageId]).remove();
			}

		}
		else {

			imageposts.images.id(req.body.deletePics).remove();


		}

		imageposts.save();

		var redirectLink = "/image-posts/" + req.params.slug;
		res.redirect(redirectLink);
	});	
	

});



module.exports = router;






















