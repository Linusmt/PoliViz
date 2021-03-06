var mysql = require('mysql');

//connects to SQL database
var db_config = process.env.CLEARDB_DATABASE_URL||{
  user: 'root',
  password: '',
  database: 'PoliticalData'
};

var connection;
function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
//initializes the joinedData table with information from all three tables
var init = function(){
  var queryString = 'insert into joinedData select candidate.CAND_NAME, candidate.CAND_PTY_AFFILIATION, \
  candidate.CAND_ELECTION_YR, candidate.CAND_OFFICE, candidate.CAND_OFFICE_ST, candidate.CAND_OFFICE_DISTRICT, committees.CMTE_NM, \
  committees.CMTE_PTY_AFFILIATION, cont_to_cand.TRANSACTION_AMT from candidate inner join cont_to_cand \
  on candidate.CAND_ID = cont_to_cand.CAND_ID inner join committees on cont_to_cand.CMTE_ID = committees.CMTE_ID;';
  
  connection.query(queryString, function(err, results){
    if(err) console.log(err);
  });

};

//gets total contributions for each candidate, ordered by committee name.
var getContributions = function(callback){
  var queryString = 'select CAND_NAME, CAND_PTY_AFFILIATION, CMTE_NM, SUM(TRANSACTION_AMT), CAND_OFFICE_ST, CAND_OFFICE \
  FROM joinedData group by CAND_NAME;';

  connection.query(queryString, function(err, results){
    if(err) console.log(err);
    callback(JSON.stringify(results));
  });
};

//individual candidate data
var getContributionsByName = function(candName, callback){
  console.log('test')
  console.log(candName)
  var queryString = "select CAND_NAME, CAND_PTY_AFFILIATION, CMTE_NM, TRANSACTION_AMT \
    FROM joinedData WHERE CAND_NAME = '"+ candName +"' order by CAND_NAME, CMTE_NM;";

  connection.query(queryString, function(err, results){
    if(err) console.log(err);
    callback(JSON.stringify(results));
  });
};


//All candidate finance data
var getCandidateFinanceData = function(callback){ 
  var queryString = "select CandFinance.CAND_NAME, CandFinance.CAND_PTY_AFFILIATION, CandFinance.TTL_RECEIPTS, \
  CandFinance.TRANS_FROM_AUTH, CandFinance.TTL_DISB, CandFinance.CAND_CONTRIB, CandFinance.TTL_INDIV_CONTRIB, \
  CandFinance.CAND_OFFICE_ST, CandFinance.OTHER_POL_CMTE_CONTRIB, CandFinance.POL_PTY_CONTRIB, candidate.CAND_OFFICE \
  from CandFinance inner join candidate on CandFinance.CAND_ID = candidate.CAND_ID order by CAND_NAME;";

  connection.query(queryString, function(err, results){
    if(err) console.log(err);
    callback(JSON.stringify(results));
  });
};

//candidate finance data by name
var getCandidateFinanceDataByName = function(candName, callback){ 
  var queryString = "select CAND_NAME, CAND_PTY_AFFILIATION, TTL_RECEIPTS, TRANS_FROM_AUTH, \
  TTL_DISB, CAND_CONTRIB, TTL_INDIV_CONTRIB, CAND_OFFICE_ST, OTHER_POL_CMTE_CONTRIB, POL_PTY_CONTRIB from CandFinance \
  inner join candidate on CandFinance.CAND_ID = candidate.CAND_ID where CAND_NAME = '" + candName + "'order by CAND_NAME;";

  connection.query(queryString, function(err, results){
    if(err) console.log(err);
    callback(JSON.stringify(results));
  });
};

exports.init = init;
exports.getContributions = getContributions;
exports.getContributionsByName = getContributionsByName;
exports.getCandidateFinanceData = getCandidateFinanceData;
exports.getCandidateFinanceDataByName = getCandidateFinanceDataByName;


