var database = require('./databaseInteractor.js');
var request = require('request');

var databaseFilter = function(collectionName, name, firstName, lastName, req, res) {
  if (collectionName === 'dataSets') {
    //check database for dataset
    database.findDataSet(collectionName, name, function(resp){
      //if no data, request from API
      if (resp === false) {
        var nameId = "";
        var politifactDb = database.chooseCollection("politifactList");
        politifactDb.findOne({"last_name":lastName, "first_name": firstName}).on('success', function(doc){
          if (doc === null) {
            console.log('ERROR');
            res.status(200).send("Error");
          } else {
            nameId = doc.name_slug;
            console.log(nameId);
            //*****CHANGE FOR PRODUCTION USE******
            //Number of documents returned set to 5.  Change the end of request string n=5 to n=(desired amount)
            request('http://www.politifact.com/api/statements/truth-o-meter/people/' +nameId+ '/json/?n=100', function (error, response, body) {
              var data = JSON.parse(body);
              if (!error && response.statusCode == 200) {
                
                //This is the list of different possible rulings that we will be looking for
                var rulingNames = ["true", "mostly-true","false", "pants-fire", "no-flip", "half-flip", "barely-true", "full-flop", "half-true"];
                var filteredData = {rulingMap:[]};//This will ultimitaly hold the data array
                

                //rulings object will 
                var rulings= {};
                //This loop fills the rulings object
                for(var i = 0 ; i < rulingNames.length ; i++){
                  rulings[rulingNames[i]]={"ruling":rulingNames[i],"value": 0, "quotes": []};
                }

                //Goes through the comment chunks and assigns them to their appropriate
                //object
                for (var i = 0; i < data.length; i++) {
                    var currentRule = rulings[data[i].ruling.ruling_slug];

                    if(currentRule && data[i].speaker.name_slug){
                      currentRule.value++;
                      currentRule.quotes.push(data[i].statement);
                    }
                }

                //Places the objects into the filtered data object to make it bett
                for(var i = 0 ; i < rulingNames.length ; i++){
                  filteredData.rulingMap.push(rulings[rulingNames[i]]);
                }
                //send to client and store in db
                database.addDataSet(collectionName, filteredData, name, function (err){});
                res.status(200).send(filteredData);
              }
            });
          }
        });
      } else {
        //if in db, send to client
        res.status(200).send(resp[0].data);
      }
    });
  }
};

module.exports = {
  databaseFilter: databaseFilter
};
