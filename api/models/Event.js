/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name:'STRING',
  	description: 'STRING',
  	date: 'DATE',
  	lat: 'FLOAT',
  	lon: 'FLOAT',
  	requiresRegistration: 'BOOLEAN',
  	registrations:{
  		collection: 'registration',
  		via: 'targetEvent'
  	},
  	address:{
      model:'address'
    }
  }
};

