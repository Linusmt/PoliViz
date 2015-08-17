var mysql = require('mysql');
// var postgres = require('pg');
//connects to SQL database

// var client = new pg.Client("postgres://root:theshoe@localhost/database");


var connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL||{
  user: 'root',
  password: 'theshoe',
  database: 'PoliticalData'
});

connection.connect();

//initializes the joinedData table with information from all three tables
var init = function(){
  connection.query('select * from committees',function(err, results){
    console.log(results);
  });
  var queryString = 'insert into joinedData select candidate.CAND_NAME, candidate.CAND_PTY_AFFILIATION, \
  candidate.CAND_ELECTION_YR, candidate.CAND_OFFICE, candidate.CAND_OFFICE_ST, candidate.CAND_OFFICE_DISTRICT, committees.CMTE_NM, \
  committees.CMTE_PTY_AFFILIATION, cont_to_cand.TRANSACTION_AMT from candidate inner join cont_to_cand \
  on candidate.CAND_ID = cont_to_cand.CAND_ID inner join committees on cont_to_cand.CMTE_ID = committees.CMTE_ID;';
  connection.query(queryString, function(err, results){
    console.log(results);
    if(err) console.log(err);
  });

};

//gets total contributions for each candidate, ordered by committee name.
var getContributions = function(callback){
  var queryString = 'select CAND_NAME, CAND_PTY_AFFILIATION, CMTE_NM, TRANSACTION_AMT \
  FROM joinedData order by CAND_NAME, CMTE_NM;';

  connection.query(queryString, function(err, results){
    if(err) console.log(err);
    callback(JSON.stringify(results));
  });
};


exports.init = init;
exports.getContributions = getContributions;


