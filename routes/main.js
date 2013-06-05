var model = require('../model');
var Post = model.Post;
var Site = model.Site;
var Field = model.Field;

exports.index = function(req, res){
	Post.find({},function(err, items){
 		if( err ){
 			console.log(err);
			res.render('index', { title: 'Entry List', items: [] });
 		}else{
			res.render('index', { title: 'Entry List', items: items });
		}
	});
};

exports.form = function(req, res){
	res.render('form', { title: 'New Entry' })
};

exports.createSite = function(req, res){
	res.render('create-site', { title: 'New Entry' })
};

exports.create = function(req, res){
	var newPost = new Post(req.body);
 	newPost.save(function(err){
 		if( err ){
 			console.log(err);
 			res.redirect("back");
 		}else{
 			res.redirect("/main");
 		}
  	});
	console.log(req.body.text);
};

exports.sites = function(req, res){
	Site.find()
		.populate("fields","title")
		.exec(function(err, sites){
			if( err ){
				res.send(200,"error");
			}else{
				res.send(200,sites);
			}
		});
}

exports.addSite = function(req, res){
	var data = JSON.parse(req.body.data);
	var site = new Site(data);
 	site.save(function(err){
 		if( err ){
 			console.log(err);
 			res.send(500);
 		}else{
			console.log("site saved");
			for( var f in data.field ){
				var field = new Field(data.field[f]);
				field.site = site;
				field.save();
				site.fields.push( field );
			}
			site.save();
 			res.send(200, site);
 		}
  	});
};

