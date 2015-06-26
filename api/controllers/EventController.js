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
 			name: eventToAdd.name
 		}).then(function(model) {
 			console.log(model.name + ' on lisätty tietokantaan onnistuneesti!');
	      // Palauta vastauksena lisätty aihealue
	      res.send(model);
	  });

 	}

 };

