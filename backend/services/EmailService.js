var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

module.exports = {
    sendEmail: function(mailOptions){

        var poolConfig = {
            pool: true,
            host: 'smtp.gmail.com',
            port: 465, // Don't change! Changing might cause emails to be not sent!
            secure: true, // use SSL 
            auth: {
                user: 'seeyanoreply@gmail.com',
                pass: '?tr4shgmail?'
            }
        };

        var transporter = nodemailer.createTransport(poolConfig);

        // Don't remove these
        console.log("___ Sending email...");
        console.log("___ From: " + mailOptions.from)
        console.log("___ To: " + mailOptions.to)
        console.log("___ Subject: " + mailOptions.subject);
        console.log("___ Html: " + mailOptions.html);
         
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                // TODO: return error to user?
                return console.log(error);
            }
            // TODO: return to user that email has been sent?
            console.log('Message sent: ' + info.response);
        });

    },

    sendVerificationEmail: function(userEmail, emailVerificationId, username) {
        var that = this;

        var templatePath = path.join(__dirname, 'emailTemplates/emailVerification.html');

        fs.readFile(templatePath, 'utf-8', function(error, source) {
            var template = handlebars.compile(source);

            var greetUsername = false;
            if(username.length > 0 && username.indexOf("Anonymous") == -1) {
                greetUsername = true;
            }
            var templateData = {
                verificationLink: "www.seeyaevents.com/emailVerification/?" + emailVerificationId,
                //minifiedVerificationLink: "seeyaevents.com/emailVerification/?" + emailVerificationId.substring(0, 15) + "...",
                greetUsername: greetUsername,
                username: username
            }

            var emailHtmlContent = template(templateData);

            var mailOptions = {
                from: '"TeamSeeYa" <teamSeeYa@NoReply.com>',
                to: userEmail, // can be more receivers, for example: 'bar@blurdybloop.com, baz@blurdybloop.com',
                subject: 'SeeYa account verification',
                html: emailHtmlContent
            };

            that.sendEmail(mailOptions);
        });
    },

    sendLostPasswordEmail: function() {
        // TODO later
    }



};