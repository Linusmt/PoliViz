module.exports = function(sequelize, DataTypes) {
  return sequelize.define("joined", {
    CAND_NAME: DataTypes.STRING(200),
    CAND_PTY_AFFILIATION: DataTypes.STRING(3),
    CAND_ELECTION_YR: DataTypes.INTEGER,
    CAND_OFFICE:  DataTypes.STRING(1),
    CAND_OFFICE_ST: DataTypes.STRING(2),
    CAND_OFFICE_DISTRICT: DataTypes.STRING(2),
    CMTE_NM: DataTypes.STRING(200),
    CMTE_PTY_AFFILIATION: DataTypes.STRING(3),
    TRANSACTION_AMT: DataTypes.DECIMAL(14,2)
  }, {
    tableName:'joinedData'
  });
};


