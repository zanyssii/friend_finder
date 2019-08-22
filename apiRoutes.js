
var friendsArray = require('friends');


module.exports = function(app) {
    
  
    app.get('/api/friends', function(req, res) {
        res.json(friendsArray);
    });

    
    app.post("/api/friends", function(req, res) {
        
        var submittedScores = req.body.scores;
        var totalDifference = 0;
        var matchArray = [];
        var bestMatchScore = 40; 
        var bestMatchID = 0;

       
        var scoresArray = friendsArray.map(function(a) {
            return a.scores;
        });
        
       
        for (var i=0; i < scoresArray.length; i++) {

           
            var totalDifference = 0;

           
            for (var k=0; k < scoresArray[i].length; k++) {

               
                totalDifference += Math.abs(submittedScores[k] - scoresArray[i][k]);
            }

         
            matchArray.push(totalDifference);
            
        
            for (var l=0; l < matchArray.length; l++) {
                if (matchArray[l] <= bestMatchScore) {
                    bestMatchScore = matchArray[l];
                    bestMatchID = l;
                }
            }
        }
       
        res.json(friendsArray[bestMatchID]);
    });
}
