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

var crypto = require('crypto');
var iterations = 3000;
var hashLengthInBytes = 256;
var hashingAlgorithm = 'sha256';

/*we represent the hashes and salts in hexadecimal (base 16) format
    Two hexadecimal characters can fit into 256 bytes, 
    that's why salt and hash fields in user model are 512 characters
    */
var representation = 'hex'; //we represent the hashes and salts in hexadecimal format
module.exports = {

    hashPassword: function(password, callBack){
        //randombytes provides us with a random salt, which goes into the salt variable
        crypto.randomBytes(128, function(err, salt) {   
            if (err) { throw err; }
            /*make salt to base 16 representation. 
            Two hexadecimal characters can fit into 256 bytes, 
            that's why this field (and the hash field) is 512 characters
            long in the database
            */
            salt = new Buffer(salt).toString('hex');
            crypto.pbkdf2(password, salt, iterations, hashLengthInBytes, hashingAlgorithm,
                function (err, hash){
                
                    hash = new Buffer(hash).toString('hex') 
                    callBack(salt, hash);
                });
        });
    }
};



