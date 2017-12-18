var express = require('express');
const path = require('path');
var readline = require('readline');
const http = require('http')
const google = require('googleapis')
const drive = google.drive('v3')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const fs = require('fs')
const cors = require('cors')
var app = express();
app.use(bodyParser.json())
app.use(cors())
const privatekey  = require("./utils/My Project 92371-ea52dc4de173.json");

/***var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})**/

function emptyFiles(){
//deleting files in uploads folder
fs.readir('./uploads', (err,files) =>{
	if(err) throw err;

	if(files.length>=5){
		console.log('deleting happening!')
		for(const file of files){
			fs.unlink(path.join('./uploads', file), err => {
				if(err) throw err;
			})
		}
	} else {console.log('Sowwy, nothing to delete!')}
})
}

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
//console.log(tokens)	
console.log("Successfully connected!");
}
});

	function uploadG(data,name){
		return new Promise((resolve, reject)=>{
var fileMetadata = {
	name: name,
	parents: ['1gxj0h4q37VqNx9jEzu0AfytGasfyxQYQ']
}
	
var media = {
mimeType: 'image/*',
body: data
};

drive.files.create({
auth:jwtClient,
resource: fileMetadata,
media: media,
fields: 'id'
},(err, file) => {
if(err) {
// Handle error
console.log(err); reject(Error(err));
} else {
console.log('File Id: ', file.id);
resolve(file.id);
}
})			
		});
	}


// Routes
app.get('/helloword', function(req, res) {
  res.json({hello:'Hello World!'});
});

app.get('/', function(req, res) {
  res.json({hello:'Hello App!'});
});

app.post("/api/upload", upload.any(), (req, res, next) => {
	/**var upload = multer({
		storage: storage
	}).single('file')
	
	upload(req, res, function(err) {
		var bitmap = fs.createReadStream('./uploads/' + req.file.filename);
		//console.log(bitmap)
	var uu = uploadG(bitmap,req.file.filename); 
	uu.then(fileId => {
        emptyFiles();
		res.json({'fileId':fileId});
		console.log('fileId from promise:', fileId);
	}).catch(function(error){console.log(error)})
	})**/
	console.log('The files ',JSON.stringify(req.files));
	console.log('The body: ',JSON.stringify(req.body));
	res.json({fileId:'file receved by server'});
})

// Listen
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on localhost:'+ port);