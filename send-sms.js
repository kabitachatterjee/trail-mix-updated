// Twilio Credentials
var accountSid = 'AC624930658ea3b50e5395f7fdf49659d8';
var authToken = 'bd903267770b3706e0e4eebcdebaaa27';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: "+16503078070",
    from: "+16504092608",
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
}, function(err, message) {
    console.log(message.sid);
});
