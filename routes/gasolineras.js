/*eslint-env node*/

//var services = JSON.parse(process.env.VCAP_SERVICES || "{}");

var mongo = require('mongodb');
var composeUri = 'mongodb://apiuser:password@horace.0.mongolayer.com:10281/PuntosInteresDb?replicaSet=set-5671a0044921b75b38001402';

exports.findGasolinerasAroundPoint = function(req, res) {
	mongo.MongoClient.connect(composeUri,{}, function(err, conn){
		console.log("Connection Error --> " + err);
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
				console.log("Cursor Error --> " + err);
				cursor.toArray(function(err,items){
					console.log("Items Error --> " + err);
					res.send(items);
		});
	});
	});		
};