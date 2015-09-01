module.exports = {
	environment: 'development',
	base: function() {
		if(this.environment == 'development') {
			return 'http://localhost:1337';
		} else if(this.environment == 'production') {
			return 'http://event-meetup.herokuapp.com';
		}
	}

}