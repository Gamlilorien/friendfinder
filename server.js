//**** Required module dependencies ****
//======================================
var express = require("express");
var path = require("path");

//Settings for express
var app = express();
//Since we will host on Heroku, we need process.env.PORT OR (ie ||) use 3000
var PORT = process.env.PORT || 3000;

//Data parsing for express just in case
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//I want to use custom css
app.use(express.static("public"));

//require the other files
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);


//**** Start server & begin listening ****
//========================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });