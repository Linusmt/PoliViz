if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null
    , path = require('path');
     
  // if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  //   // the application is executed on Heroku ... use the postgres database
  //   sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
  //     dialect:  'postgres',
  //     protocol: 'postgres',
  //     port:     match[4],
  //     host:     match[3],
  //     logging:  true //false
  //   })
  // } else {
  //   // the application is executed on the local machine ... use mysql
  //   sequelize = new Sequelize('example-app-db', 'root', null)
  // }

  // global.db = {
  //   Sequelize: Sequelize,
  //   sequelize: sequelize,
  //   User:      sequelize.import(__dirname + '/user') 
  //   // add your other models here
  // } else {
    sequelize= new Sequelize('politicaldata', 'Linus1', '', {
      host:'localhost',
      dialect: 'postgres',
    
      pool: {
        max: 5,
        min: 0,
        idle:10000
      }
    });

    var models = {
      Candidate: sequelize.import(path.join(__dirname, 'candidate.js')),
      Committee: sequelize.import(path.join(__dirname, 'committees.js')),
      Cont_to_Cand: sequelize.import(path.join(__dirname, 'cont_to_cand.js')),
      Joined: sequelize.import(path.join(__dirname, 'joinedData.js')),

    }

    // var User = sequelize.define('User', {
    //   username: Sequelize.STRING,
    //   password: Sequelize.STRING
    // }, {
    //   tableName: 'my_user_table', // this will define the table's name
    //   timestamps: false           // this will deactivate the timestamp columns
    // });
    
    sequelize.sync({force:true}).then(function(){
      console.log('it worked');

     var cand = models.Candidate.create({
       CAND_ID:'NAMEAS',
       CAND_NAME: 'SUNBITCH'
     });
     console.log(cand);
    });//.then(function(SUNBITCH){
      // console.log(SUNBITCH.get({}));
    // });
  // }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
};

module.exports = global.db