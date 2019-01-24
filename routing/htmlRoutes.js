const path = require("path");

//************ App Routes *************
//======================================
module.exports = function(app){
    
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });

    //default route (ie home page)
    app.get(function(req, res){
        res.sendFile(path.join(__dirname + '/../public/home.html'))
    });
}