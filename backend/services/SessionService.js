module.exports = {
    
    updateLoginInfo:function(req, res, user){
        addUserInfoInCookie(req.seeyaSession, user);
        var response = {};
        return addSafeUserInfoInResponseObject(response, user);
    },

};

function addUserInfoInCookie(cookie, user){
        cookie.user = user;
        delete cookie.user.dataValues.password;
        delete cookie.user.dataValues.salt;
        return cookie;
}

function addSafeUserInfoInResponseObject(responseObject, user){
    responseObject.user = {
        id: user.id,
        username: user.username,
        emailVerified: user.emailVerified
    }
    return responseObject;
}