/*
We use salt and key stretching to make sure users' passwords are safe.
Salt prevents the attackers from using lookup tables.
Key stretching makes it too expensive to do dictionary or brute-force attacks.
Note that key stretching makes us more vulnerable for DoS attacks, so in case this ever becomes a problem,
we might need to reconsider if we want to use key stretching or lower the iteration count at least.

One way to decrease the burden on server side could also be to use client side hashing, but that has its own things
to consider, see https://crackstation.net/hashing-security.htm 

Ideas have been taken from these sources: 
https://crackstation.net/hashing-security.htm
https://masteringmean.com/lessons/46-Encryption-and-password-hashing-with-Nodejs
*/

var escape = require('lodash.escape');
var crypto = require('crypto');
//BE CAREFUL IF YOU PLAN TO CHANGE THESE CONFIGS
//If we lose information about what configs we used to save users' passwords, we cannot recover them anymore
//Thus if these ever need to be changed, we should probably save the configs into the database and link
//every user to the config table, so that we know which configs to use when checking the credentials of a given user.
var iterations = 2000;
var hashLengthInBytes = 256;
var hashingAlgorithm = 'sha256';

/*we represent the hashes and salts in hexadecimal (base 16) format
    Two hexadecimal characters can fit into 256 bytes, 
    that's why salt and hash fields in user model are 512 characters
    */
var representation = 'hex'; //we represent the hashes and salts in hexadecimal format
module.exports = {

    hashPasswordWithGeneratedSalt: function(password, errorCallback, successCallback){
        //randombytes provides us with a random salt, which goes into the salt variable
        crypto.randomBytes(hashLengthInBytes, function(err, salt) {   
            if (err) { 
                errorCallback(err); 
            }else{
                /*make salt to base 16 representation. 
                Two hexadecimal characters can fit into 256 bytes, 
                that's why this field (and the hash field) is 512 characters
                long in the database
                */
                salt = new Buffer(salt).toString('hex');
                module.exports.hashPassword(password, salt, errorCallback, successCallback)
            }
          });
    },
    hashPassword: function(password, salt, errorCallback, successCallback){
        //Do the actual hashing of the password
        crypto.pbkdf2(password, salt, iterations, hashLengthInBytes, hashingAlgorithm,
            function (err, hash){
                if (err) { 
                    errorCallback(err); 
                } else {
                    hash = new Buffer(hash).toString('hex') 
                    successCallback(salt, hash);
                }
        });
    },

    //sanitize all input except passwords
    sanitizeInput: function(req, res, next){
        var whiteList = ['password', 'repeatpassword', 'oldpassword', 'email']
        var input = req.body
        console.log("sanitizing!!!!")

        var sanitizedObj = {};
        transform(input, sanitizedObj, 'transformed', escape, whiteList);
        console.log("sanitized")
        console.log(sanitizedObj)
        req.body = sanitizedObj.transformed
        
        next();
    }
};


/**applies the transformFunction to all the object properties going through all the nested
    properties as well. The property is not transformed if its key is listed in the
    exceptions list

    The function doesn't transform the object itself, but constructs a new object into the resObj

    TODO: probably doesn't handle arrays correctly, fix that
**/
function transform(obj, resObj, stack, transformFunction, exceptions) {
    console.log("iterate called")
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                transform(obj[property], resObj, stack + '.' + property, transformFunction, exceptions);
            } else {

                if( exceptions.indexOf(property.toLowerCase()) === -1){
                    var transformed = transformFunction(obj[property]);
                    assign(resObj, stack + "." + property, transformed);
                }else{
                    assign(resObj, stack + "." + property, obj[property]);
                }
               
               // console.log(property + "   " + obj[property]);
                //$('#output').append($("<div/>").text(stack + '.' + property))
            }
        }
    }
}

function assign(obj, prop, value) {
    if (typeof prop === "string")
        prop = prop.split(".");

    if (prop.length > 1) {
        var e = prop.shift();
        assign(obj[e] =
                 Object.prototype.toString.call(obj[e]) === "[object Object]"
                 ? obj[e]
                 : {},
               prop,
               value);
    } else
        obj[prop[0]] = value;
}


