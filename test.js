//Global variables
//set placeholder value for start
    //this will allow us to capture the best match so we don't have to loop through the list of friends twice
    var bestMatch = {
        id: "na",
        rating: "na"
    };

    var score = 0;

//variables for testing
var smegol = [5, 1, 1, 1, 5, 1, 1, 1, 1, 1];
var joe = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

friends = [
    {
        "name":"Gimli, son of Glóin",
        "photo":"https://vignette.wikia.nocookie.net/lotr/images/e/ec/Gimli_-_FOTR.png/revision/latest?cb=20121008105956",
        "scores":[
            1,
            1,
            5,
            3,
            5,
            1,
            5,
            1,
            1,
            1
          ]
      },
      {
        "name":"Gandalf Stormcrow",
        "photo":"https://vignette.wikia.nocookie.net/lotr/images/e/e7/Gandalf_the_Grey.jpg/revision/latest?cb=20121110131754",
        "scores":[
            5,
            1,
            1,
            5,
            3,
            5,
            1,
            5,
            5,
            1
          ]
      },
      {
        "name":"Aragorn son of Arathorn",
        "photo":"https://vignette.wikia.nocookie.net/lotr/images/b/b6/Aragorn_profile.jpg/revision/latest?cb=20170121121423",
        "scores":[
            3,
            5,
            3,
            5,
            1,
            1,
            1,
            1,
            5,
            1
          ]
      },
      {
        "name":"Saruman",
        "photo":"https://vignette.wikia.nocookie.net/lotr/images/0/0c/Christopher_Lee_as_Saruman.jpg/revision/latest?cb=20170127113833",
        "scores":[
            5,
            1,
            3,
            3,
            3,
            5,
            1,
            1,
            1,
            5
          ]
      },
      {
        "name":"Peregrin Took",
        "photo":"https://vignette.wikia.nocookie.net/lotr/images/0/0a/Pippinprintscreen.jpg/revision/latest?cb=20060310083048",
        "scores":[
            5,
            3,
            5,
            5,
            5,
            1,
            1,
            1,
            3,
            1
          ]
      }

];

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
                rating: score
            }
        } else {
            //now if any future values result in a lower score update with THAT score
            if(score < bestMatch.rating) {
                bestMatch = {
                    id: i,
                    rating: score
                }
            }
            //othwerwise ignore and keep current value
        }
        //now inform user of best match
        //console.log(bestMatch);
    }
    //final result
    console.log(bestMatch);
}

//now run for testing
evaluateFriends(smegol, friends);