import google from 'googleapis';
import privatekey  from "./demo-60feb12fe722.json";

// configure a JWT auth client
var jwtClient = new google.auth.JWT(
privatekey.client_email,
null,
privatekey.private_key,
['https://www.googleapis.com/auth/spreadsheets',
'https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/calendar']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
if (err) {
console.log(err);
return;
} else {
console.log(tokens)	
console.log("Successfully connected!");
}
});

var jwt_token = jwtClient

export default jwt_token