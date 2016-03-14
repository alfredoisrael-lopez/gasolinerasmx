/*eslint-env node*/

//var services = JSON.parse(process.env.VCAP_SERVICES || "{}");

var mongo = require('mongodb');
var composeUri = 'mongodb://apiuser:password@horace.0.mongolayer.com:10281/PuntosInteresDb';

exports.findGasolinerasAroundPoint = function(req, res) {
	mongo.MongoClient.connect(composeUri,{}, function(err, conn){
		var collection = conn.collection('Gasolineras');
		collection.find({
							location:{
								$geoWithin:{
									$centerSphere:[[parseFloat(req.query.lon), parseFloat(req.query.lat) ], 
													parseFloat(req.query.radius) / 6378.1 ] 
									} 
							 } 
					    },
					    {},
			function(err, cursor){
				cursor.toArray(function(err,items){
					res.send(items);
		});
	});
	});		
};