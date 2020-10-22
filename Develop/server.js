const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const db = require("../develop/db/db.json");

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( express.static('public'));

//HTML ROUTES

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../develop/public/notes.html"))
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

//API ROUTES

app.get("/api/notes", function(req, res) {
    res.json(db)
});

app.post("/api/notes", function(req, res) {
    req.body.id = Date.now();
    db.push(req.body);
    fs.writeFileSync("../develop/db/db.json", JSON.stringify(db));
    res.json(req.body);
});

app.delete("/api/notes/:id", function(req, res) {
    var chosen = parseInt(req.params.id);
    for (var i = 0; i < db.length; i++) {
        if (chosen === db[i].id) {
            console.log(db[i]);
            db.splice(i, 1);
            fs.writeFileSync("../develop/db/db.json", JSON.stringify(db));
            return res.status(200).end();
        }
    }
});

//Set the PORT up to listen

app.listen(PORT, function() {
    console.log("App listening on PORT", PORT);
})