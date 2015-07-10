/**
 * AddressController
 *
 * @description :: Server-side logic for managing addresses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 	findOne: function (req, res) {
 		var addressId = req.params.id;
 		Address.findOne({
 			where: { id: addressId }
 		}).then(function (address) {
 			console.log(address);
 			res.send(address);
 		});
 	}
};
