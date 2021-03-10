var fs = require("fs");
var http = require("http");
var qs = require("querystring");

const handlePost = (req, res) => {
	var allData = "";
	var finish = null;

	req.on("data", function(data) {
		allData += data;
	});

	req.on("end", function(data) {
		
		var obj = JSON.parse(allData);
		console.log(allData)

		if (obj.body.action == "FIRST") sendOnFirstRequest(res);
		else if (obj.body.action == "NEXT") sendOnNextRequest(obj.body.albumName);
		else if (obj.body.action == "GET_COVERS") sendCovers(res);
	});
};

const sendOnFirstRequest = (res) => {
	let data = {};
	data["dirs"] = [];
	data["files"] = [];

	fs.readdir(__dirname + "/mp3", function(err, files) {
		if (err) {
			return console.log(err);
		}

		files.forEach(function(fileName) {
			data["dirs"].push(fileName);
		});
	});

	fs.readdir(__dirname + "/mp3/album1", function(err, files) {
		if (err) {
			return console.log(err);
		}

		files.forEach(function(fileName) {
			//console.log(fileName);
			data["files"].push({ file: fileName });
		});

		//console.log(data);
		res.writeHead(200, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		});
		res.write(JSON.stringify(data));
		res.end();
	});
};

const sendOnNextRequest = (album) => {
	let data = {};
	data["dirs"] = [];
	data["files"] = [];

	fs.readdir(__dirname + "/mp3/" + album, function(err, files) {
		if (err) {
			return console.log(err);
		}

		files.forEach(function(fileName) {
			//console.log(fileName);
			data["files"].push({ file: fileName });
		});

		//console.log(data);
		res.writeHead(200, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		});
		res.write(JSON.stringify(data));
		res.end();
	});
};

const sendCovers = (res) => {
	const covers = {};

	fs.readdir(`${__dirname}/mp3`, function(err, albums) {
		if (err) {
			return console.log(err);
		}
		for (i = 0; i <= albums.length - 1; i++) {
			let dir = fs.readdirSync(`${__dirname}/mp3/${albums[i]}`);
			dir.forEach((file) => {
				if (file == "cover.jpg") {
					let data = fs.readFileSync(`${__dirname}/mp3/${albums[i]}/${file}`);
					covers[albums[i]] = data;
				}
			});
		}
		res.writeHead(200, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		});
		//console.log(JSON.stringify(covers))
		res.write(JSON.stringify(covers));
		res.end();
	});
};

var server = http.createServer(function(req, res) {
	switch (req.method) {
		case "GET":
			break;
		case "POST":
			if (req.url == "/getMusicStructure") {
				console.log("POST")
				const postData = handlePost(req, res);
			} /*else if(req.url == "/getCovers"){
				console.log("POST COVERS")
			}*/
			break;
	}
});

server.listen(3000, function() {
	console.log("Start servera");
});
