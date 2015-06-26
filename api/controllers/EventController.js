/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	findOne: function (req, res) {
 		var eventId = req.params.id;
 		Event.findOne({
 			where: { id: eventId }
 		}).then(function (event) {
 			res.send(event);
 		});
 	},

 //	findAll: function

 	create: function (req, res) {
 		var eventToAdd = req.body;
 		Event.create({
 			name: eventToAdd.name
 		}).then(function(model) {
 			console.log(model.name + ' on lisätty tietokantaan onnistuneesti!');
      // Palauta vastauksena lisätty aihealue
      res.send(model);
  });





    //res.json({

 //   });
}

};

