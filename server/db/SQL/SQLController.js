var SQLdb = require('./SQLInteractor.js')

SQLdb.init();
console.log('initialized');
var getFinancialData = function(req, res, next){ 
  SQLdb.getContributions(function(results){ 
    res.send(results)
  })
};

exports.getFinancialData = getFinancialData;