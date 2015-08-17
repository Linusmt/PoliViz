var SQLdb = require('./SQLInteractor.js')

var getSummaryData = function(req, res, next){ 
  SQLdb.getCandidateFinanceData(function(results){ 
    res.send(results)
  })
};
<<<<<<< HEAD

var getSummaryDataByName = function(req, res, next){ 
=======
//invidividual candidate data
var getCandidateData = function(req, res, next){ 
>>>>>>> (feat) prepared the directory for deployment
  var candName = req.body.candName;
  SQLdb.getCandidateFinanceDataByName(candName, function(results){ 
    res.send(results)
  })
};

exports.getSummaryData = getSummaryData;
exports.getSummaryDataByName = getSummaryDataByName;