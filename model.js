var mongoose = require('mongoose');
/*
//af VCAP_SERVICES value:
{
	"mongodb-1.8":[
		{
			"name":"mongo",
			"label":"mongodb-1.8",
			"plan":"free",
			"tags":[
				"mongodb",
				"mongodb-1.8",
				"nosql",
				"mongodb-1.8",
				"mongodb"
			],
			"credentials":{
				"hostname":"x.x.x.x",
				"host":"x.x.x.x",
				"port":25389,
				"username":"user",
				"password":"pass",
				"name":"name",
				"db":"db",
				"url":"mongodb://user:pass@x.x.x.x:25389/db"
			}
		}
	]
}
*/

var url;

if( process.env.VCAP_SERVICES ){
    var env = JSON.parse( process.env.VCAP_SERVICES );
    url = env['mongodb-1.8'][0]['credentials']['url'];	
}else{
    url = 'mongodb://127.0.0.1:27017/db';
}

var db = mongoose.connect(url);

function validator(v) {
  return v.length > 0;
}

var Post = new mongoose.Schema({
    text   : { type: String, validate: [validator, "Empty Error"] }
  , created: { type: Date, default: Date.now }
});

var Site = new mongoose.Schema({
	title  : String,
	address: String,
    location: { 
    	lat : Number,
    	lng : Number 
    },
    created: { type: Date, default: new Date()},
	baseUrl: String,
	fields : [{type: mongoose.Schema.Types.ObjectId, ref : 'Field'}]
});

var Field = new mongoose.Schema({
	title  : { type: String, default: ""},
	site   : {type: mongoose.Schema.Types.ObjectId, ref : 'Site'},
	reservations : [{type: mongoose.Schema.Types.ObjectId, ref : 'Reservation'}],
	dayinfos : [{type: mongoose.Schema.Types.ObjectId, ref : 'Dayinfo'}]
});

var Reservation = new mongoose.Schema({
	date : {type: Date},
	timeslot  : { type: String, default: ""},
	field : {type: mongoose.Schema.Types.ObjectId, ref : 'Field'}
});

var Dayinfo = new mongoose.Schema({
	date : {type: Date},
	data  : { type: String, default: ""},
	field : {type: mongoose.Schema.Types.ObjectId, ref : 'Field'}
});



exports.Post = db.model('Post', Post);
exports.Site = db.model('Site', Site);
exports.Field = db.model('Field', Field);
exports.Reservation = db.model('Reservation', Reservation);
exports.Dayinfo = db.model('Dayinfo', Dayinfo);

