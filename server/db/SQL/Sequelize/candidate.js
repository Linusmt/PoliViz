module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Candidate", {
    CAND_ID: {
        type: DataTypes.STRING(9),
        primaryKey:true
    },
    CAND_NAME: DataTypes.STRING(200),
    CAND_PTY_AFFILIATION: DataTypes.STRING(3),
    CAND_ELECTION_YR: DataTypes.INTEGER(4),
    CAND_OFFICE_ST: DataTypes.STRING(2),
    CAND_OFFICE:  DataTypes.STRING(1),
    CAND_OFFICE_DISTRICT: DataTypes.STRING(2),
    CAND_ICI: DataTypes.STRING(1),
    CAND_STATUS: DataTypes.STRING(1),
    CAND_PCC: DataTypes.STRING(9),
    CAND_ST1: DataTypes.STRING(34),
    CAND_ST2: DataTypes.STRING(34),
    CAND_CITY: DataTypes.STRING(30),
    CAND_ST: DataTypes.STRING(2),
    CAND_ZIP: DataTypes.STRING(19)
  }, {
    tableName:'candidates'
  });
};
