module.exports = {
	environment: 'development',
	base: function() {
		if(this.environment == 'development') {
			return '//localhost:1337';
		} else if(this.environment == 'production') {
			return '//event-meetup.herokuapp.com';
		}
	}

}