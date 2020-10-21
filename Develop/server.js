const express = require("express");
const app = express();
const path = require("path");

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

app.listen(PORT, function() {
    console.log("App listening on PORT", PORT);
})