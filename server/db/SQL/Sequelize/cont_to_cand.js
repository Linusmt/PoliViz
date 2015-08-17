module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Cont_to_Cand", {
    CMTE_ID:  DataTypes.STRING(9),
    AMNDT_IND:  DataTypes.STRING(1),
    RPT_TP:  DataTypes.STRING(3),
    TRANSACTION_PGI:  DataTypes.STRING(5),
    IMAGE_NUM:  DataTypes.STRING(18),
    TRANSACTION_TP:  DataTypes.STRING(3),
    ENTITY_TP:  DataTypes.STRING(3),
    NAME:  DataTypes.STRING(200),
    CITY:  DataTypes.STRING(30),
    STATE:  DataTypes.STRING(2),
    ZIP_CODE:  DataTypes.STRING(9),
    EMPLOYER:  DataTypes.STRING(38),
    OCCUPATION:  DataTypes.STRING(38),
    TRANSACTION_DT:  DataTypes.DATE,
    TRANSACTION_AMT:  DataTypes.DECIMAL(14,2),
    OTHER_ID:  DataTypes.STRING(9),
    CAND_ID:  DataTypes.STRING(9),
    TRAN_ID:  DataTypes.STRING(32),
    FILE_NUM:  DataTypes.INTEGER,
    MEMO_CD:  DataTypes.STRING(1),
    MEMO_TEXT:  DataTypes.STRING(100),
    SUB_ID:  DataTypes.INTEGER
 }, {
    tableName:'cont_to_cand'
  });
};


