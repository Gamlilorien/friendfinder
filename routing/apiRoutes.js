var friends = require("../data/friends");

//Global variables
//set placeholder value for start
    //this will allow us to capture the best match so we don't have to loop through the list of friends twice
    var bestMatch = {
        id: "na",
        name: "",
        photo: "",
        score: ""
    };

    var score = 0;

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        //first calculate the friend match based on their result
        evaluateFriends(req.body.scores, friends);

        //now add new entry to the server
        friends.push(req.body);

        //send bestMatch result as a callback to survey file, and then clear the form
        res.json(bestMatch);
   
    })

};

//FUNCTIONS for evaluating friend score
function getScore(nArray, fArray) {
    var len = nArray.length;
    //reset score for each iteraton
    score = 0;
    for (k = 0; k < len; k++) {
        //subtract one from the other for score of the particular question
        var qScore = nArray[k] - fArray[k];
        //console.log("qScore: " +qScore);
        
        //only allow positive or zero values
        if(qScore < 0) {
            qScore = Math.abs(qScore);
        }

        //now add this questions score to the overall score
        score = score + qScore;
        //console.log(score);
    };
    //total score
    //console.log(score);
};

function evaluateFriends(nArray, fArray) {
    var len = fArray.length;
    //low loop through the list of friends to determine compatiblity scores...
    for(i = 0; i < len; i++) {
        getScore(nArray, fArray[i].scores);
        //console.log("f " +i +" = " +score);
        //if being run for the first time, replace default values
        if(bestMatch.id === "na") {
            bestMatch = {
                id: i,
                name: fArray[i].name,
                photo: fArray[i].photo,
                score: score
            }
        } else {
            //now if any future values result in a lower score update with THAT score
            if(score < bestMatch.score) {
                bestMatch = {
                    id: i,
                    name: fArray[i].name,
                    photo: fArray[i].photo,
                    score: score
                }
            }
            //othwerwise ignore and keep current value
        }
        //now inform user of best match
        //console.log(bestMatch);
    }
    //final result
    //console.log(bestMatch);
};