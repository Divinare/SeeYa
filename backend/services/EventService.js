module.exports{
    findUserEvents: function(user, success, error){
        if( typeof user === 'undefined' || user === null){
            error({message: 'user not provided'})
        }else{
            models.Event.findAll({
                where: {
                    creator: user.id;
                }
            }).then(function (events) {
                success(events);
            }).catch(function(err){
                error(err);
            });
        }
    }
}