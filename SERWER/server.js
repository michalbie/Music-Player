var fs = require("fs");
var http = require("http");
var qs = require("querystring");
var Datastore = require("nedb");
var formidable = require("formidable");

var playlistsDatabase = new Datastore({
    filename: "playlists.db",
    autoload: true,
});

/*let doc = {
    playlistName: "Favorite",
    songsList: {
        1: {
            songName: "DrugiAlbumUtwor2.mp3",
            albumName: "album2"
        }
    }
};

playlistsDatabase.insert(doc, function(err, newDoc) {});*/

const handlePost = (req, res) => {
    var allData = "";
    var finish = null;

    req.on("data", function (data) {
        allData += data;
    });

    req.on("end", function (data) {
        var obj = JSON.parse(allData);
        console.log(allData);

        if (obj.body.action == "FIRST") sendOnFirstRequest(res);
        else if (obj.body.action == "NEXT") sendOnNextRequest(res, obj.body.albumName);
        else if (obj.body.action == "GET_COVERS") sendCovers(res);
    });
};

const sendOnFirstRequest = (res) => {
    let data = {};
    data["dirs"] = [];
    data["files"] = [];

    fs.readdir(__dirname + "/mp3", function (err, dirs) {
        if (err) {
            return console.log(err);
        }

        dirs.forEach(function (dirName) {
            data["dirs"].push(dirName);
        });

        fs.readdir(`${__dirname}/mp3/${data.dirs[0]}`, function (err, files) {
            if (err) {
                return console.log(err);
            }

            files.forEach(function (fileName) {
                if (fileName.match(/\.mp3/g)) {
                    var stats = fs.statSync(`${__dirname}/mp3/${data.dirs[0]}/${fileName}`);
                    var fileSizeInMegabytes = stats.size / (1024 * 1024);
                    data["files"].push({ file: fileName, size: fileSizeInMegabytes.toFixed(2) });
                }
            });

            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.write(JSON.stringify(data));
            res.end();
        });
    });
};

const sendOnNextRequest = (res, album) => {
    let data = {};
    data["dirs"] = [];
    data["files"] = [];

    fs.readdir(__dirname + "/mp3/" + album, function (err, files) {
        if (err) {
            return console.log(err);
        }

        files.forEach(function (fileName) {
            if (fileName.match(/\.mp3/g)) {
                var stats = fs.statSync(__dirname + `/mp3/${album}/` + fileName);
                var fileSizeInMegabytes = stats.size / (1024 * 1024);
                data["files"].push({ file: fileName, size: fileSizeInMegabytes.toFixed(2) });
            }
        });

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

    fs.readdir(`${__dirname}/mp3`, function (err, albums) {
        if (err) {
            return console.log(err);
        }
        for (i = 0; i <= albums.length - 1; i++) {
            let dir = fs.readdirSync(`${__dirname}/mp3/${albums[i]}`);
            let hasCover = false;
            dir.forEach((file) => {
                if (file.indexOf(".jpg") != -1 || file.indexOf(".png") != -1) {
                    covers[albums[i]] = `http://localhost:3000/mp3/${albums[i]}/${file}`;
                    hasCover = true;
                }
            });
            if (!hasCover) {
                covers[albums[i]] = "http://localhost:3000/defaultCover.jpg";
                console.log("No cover. Setting default.");
            }
        }
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.write(JSON.stringify(covers));
        res.end();
    });
};

const sendPlaylistsData = (res) => {
    playlistsDatabase.find({}, function (err, docs) {
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.write(JSON.stringify(docs));
        res.end();
    });
};

const changePlaylistData = (req, res) => {
    var allData = "";

    req.on("data", function (data) {
        allData += data;
    });

    req.on("end", function (data) {
        var obj = JSON.parse(allData);

        if (obj.body.action == "ADD_TO_PLAYLIST") addToPlaylist(obj, res);
        if (obj.body.action == "REMOVE_FROM_PLAYLIST") removeFromPlaylist(obj, res);
    });
};

const addToPlaylist = (data, res) => {
    playlistsDatabase = new Datastore({
        filename: "playlists.db",
        autoload: true,
    });

    const checkIfIsAdded = async (data) => {
        let isAdded = false;

        let found = await new Promise((resolve, reject) => {
            playlistsDatabase.find({ playlistName: data.body.songData.playlistName }, (err, docs) => {
                docs[0].files.forEach((el) => {
                    if (el.file == data.body.songData.songName) {
                        isAdded = true;
                    }
                });
                resolve(isAdded);
            });
        });

        return found;
    };

    playlistsDatabase.find({ playlistName: data.body.songData.playlistName }, async function (err, docs) {
        if ((await checkIfIsAdded(data)) == false) {
            let newSongObj = {
                file: data.body.songData.songName,
                albumName: data.body.songData.albumName,
                size: data.body.songData.size,
            };

            docs[0].files.push(newSongObj);

            playlistsDatabase.remove({ playlistName: data.body.songData.playlistName }, {}, function (err, numRemoved) {
                console.log("usunięto dokumentów: ", numRemoved);
            });

            playlistsDatabase.insert(docs, function (err, newDoc) {
                playlistsDatabase.find({}, function (err, docs) {
                    console.log(JSON.stringify(docs, null, 5));
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    });
                    res.write(JSON.stringify(docs));
                    res.end();
                });
            });
        } else {
            console.log("ALREADY ADDED");
            res.writeHead(200, {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            });
            res.write("Duplication Error");
            res.end();
        }
    });
};

const removeFromPlaylist = (data, res) => {
    playlistsDatabase = new Datastore({
        filename: "playlists.db",
        autoload: true,
    });

    playlistsDatabase.find({ playlistName: data.body.songData.playlistName }, function (err, docs) {
        let indexToDelete = null;
        docs[0].files.forEach((song) => {
            if (song.file == data.body.songData.songName) {
                indexToDelete = docs[0].files.indexOf(song);
            }
        });

        docs[0].files.splice(indexToDelete, 1);

        playlistsDatabase.remove({ playlistName: data.body.songData.playlistName }, function (err, numRemoved) {
            console.log("deleted " + numRemoved + err);
        });

        playlistsDatabase.insert(docs[0], function (err, newDoc) {
            playlistsDatabase.find({}, function (err, docs) {
                console.log(JSON.stringify(docs, null, 5));
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                });
                res.write(JSON.stringify(docs));
                res.end();
            });
        });
    });
};

const uploadFiles = (req, res) => {
    console.log("Upload...");
    let currentIndex = "1";
    var dir = __dirname + "/mp3/Album" + currentIndex; //try this first
    let isCreated = false;

    while (isCreated == false) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            isCreated = true;
        } else {
            currentIndex++;
            dir = __dirname + "/mp3/Album" + currentIndex;
        }
    }

    let form = formidable({});
    form.keepExtensions = true;
    form.uploadDir = dir;

    form.parse(req, function (err, fields, files) {
        console.log("Uploading: " + JSON.stringify(files, null, 5));
        res.writeHead(200, { "Content-Type": "application/json" });
        response = {};
        Object.keys(files).forEach((key) => {
            fs.renameSync(files[key].path, `${dir}/${files[key].name}`, function (err) {
                if (err) console.log(err);
            });
            response[key] = {
                name: files[key].name,
                size: files[key].size,
                albumName: "Album" + currentIndex,
            };
        });

        res.end(JSON.stringify(response));
    });
};

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            console.log("GET");
            if (req.url.indexOf(".mp3") != -1) {
                fs.readFile(__dirname + decodeURI(req.url), function (error, data) {
                    let stats = fs.statSync(__dirname + decodeURI(req.url));
                    res.writeHead(200, { "Content-Type": "audio/mpeg", "Content-Length": stats.size, "Accept-Ranges": "bytes" });
                    res.write(data);
                    res.end();
                });
            } else if (req.url == "/admin") {
                fs.readFile(__dirname + "/public/admin.html", function (error, data) {
                    if (error) {
                        res.writeHead(404);
                        res.write("File Not Found");
                    } else {
                        res.write(data);
                    }
                    res.end();
                });
            } else if (req.url.indexOf(".js") != -1) {
                fs.readFile(__dirname + "/public" + req.url, function (error, data) {
                    if (error) {
                        res.writeHead(404);
                        res.write("File Not Found");
                    } else {
                        res.write(data);
                    }
                    res.end();
                });
            } else if (req.url.indexOf(".jpg") != -1 || req.url.indexOf(".png") != -1) {
                fs.readFile(__dirname + decodeURI(req.url), function (error, data) {
                    console.log(__dirname + decodeURI(req.url));
                    if (error) {
                        res.writeHead(404);
                        res.write("File Not Found");
                    } else {
                        res.write(data);
                    }
                    res.end();
                });
            } else {
                res.writeHead(404);
                res.write("Doesnt exist");
                res.end();
            }
            break;

        case "POST":
            if (req.url == "/getMusicStructure") {
                const postData = handlePost(req, res);
            } else if (req.url == "/getPlaylists") {
                sendPlaylistsData(res);
            } else if (req.url == "/modifyPlaylist") {
                changePlaylistData(req, res);
            } else if (req.url == "/uploadFiles") {
                //uploadFiles(req, res); //TEMPORARILY DISABLED
                res.writeHead(404);
                res.write("Doesnt exist");
                res.end();
            } else {
                res.writeHead(404);
                res.write("Doesnt exist");
                res.end();
            }
            break;
    }
});

server.listen(3000, function () {
    console.log("Start servera");
});
