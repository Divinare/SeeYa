/**
 * RegistrationController
 *
 * @description :: Server-side logic for managing registrations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
 	findOne: function (req, res) {
 		var registrationId = req.params.id;
 		Registration.findOne({
 			where: { id: registrationId }
 		}).then(function (registration) {
 			res.send(registration);
 		});
 	},

 	findAll: function (req, res) {

 		Registration.find().then(function (registrations) {
 			res.send(registrations);
 		});

 	},
 	create: function (req, res) {
 		var registrationToAdd = req.body;
 		Registration.create({
 			comment: registrationToAdd.comment
 		}).then(function(model) {
 			//console.log(model.name + ' on lisätty tietokantaan onnistuneesti!');
	      // Palauta vastauksena lisätty aihealue
	      res.send(model);
	  });

 	},

 	update: function (req, res) {
 		var registrationId = req.params.id;
 		Registration.findOne({
 			where: { id: registrationId}
 		}).then(function( registration) {
 			registration.comment = req.body['comment'];
 			registration.save(function(err) {
 				if (err) {
 					return res.send(err);
 				}
 				res.send(200);
 			});
 		});
 	}

};

