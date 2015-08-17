 module.exports = function(sequelize, DataTypes) {
   return sequelize.define("Committee", {
      CMTE_ID: {
          type: DataTypes.STRING(9),
          primaryKey:true
      },
      CMTE_NM: DataTypes.STRING(200),
      TRES_NM: DataTypes.STRING(90),
      CMTE_ST1: DataTypes.STRING(34), 
      CMTE_ST2: DataTypes.STRING(34), 
      CMTE_CITY: DataTypes.STRING(30),
      CMTE_ST: DataTypes.STRING(2),
      CMTE_DSNG: DataTypes.STRING(1),
      CMTE_TP: DataTypes.STRING(1),
      CMTE_PTY_AFFILIATION: DataTypes.STRING(3),
      CMTE_FILING_FREQ: DataTypes.STRING(1),
      ORG_TP: DataTypes.STRING(1),
      CONNECTED_ORG_NM: DataTypes.STRING(200),
      CAND_ID: DataTypes.STRING(9) 
    }, {
      tableName:'committees'
    });
  };
