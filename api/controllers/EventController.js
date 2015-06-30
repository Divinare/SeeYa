 module.exports = {

 	findOne: function (req, res) {
 		var eventId = req.params.id;
 		Event.findOne({
 			where: { id: eventId }
 		}).then(function (event) {
 			res.send(event);
 		});
 	},

 	findAll: function (req, res) {

 		Event.find().then(function (events) {
 			res.send(events);
 		});

 	},
 	create: function (req, res) {
 		var eventToAdd = req.body;
 		Event.create({
 			name: eventToAdd.name,
 			description: eventToAdd.description,
 			date: eventToAdd.date
 		}).then(function(model) {
 			console.log(model.name + ' on lisätty tietokantaan onnistuneesti!');
	      // Palauta vastauksena lisätty aihealue
	      res.send(model);
	  });

 	},

 	update: function (req, res) {
 		var controlId = req.params.id;
 		Event.findOne({
 			where: { id: controlId}
 		}).then(function( event) {
 			event.name = req.body['name'];
 			event.description = req.body['description']
 			event.date = req.body['date']
 			event.save(function(err) {
 				if (err) {
 					return res.send(err);
 				}
 				res.send(200);
 			});
 		});
 	}
 };