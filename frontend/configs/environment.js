module.exports = {
	environment: 'development',
	base: function() {
		if(this.environment == 'development') {
			return 'http://localhost:1337';
		} else if(this.environment == 'production') {
			return 'https://event-meetup.herokuapp.com';
		}
	}

}