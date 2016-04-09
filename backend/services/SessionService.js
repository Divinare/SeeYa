module.exports = {
    
    login:function(req, res, user){
        addUserInfoInCookie(req.seeyaSession, user);
        var response = {}
        return addSafeUserInfoInObject(response, user);
    }

};

function addUserInfoInCookie(cookie, user){
        cookie.user = user;
        delete cookie.user.dataValues.password;
        delete cookie.user.dataValues.salt;
        return cookie;
}

function addSafeUserInfoInObject(object, user){
    object.user = {
        id: user.id,
        username: user.username
    }
    return object;
}