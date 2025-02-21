const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Member = require("./Member");
const Book = require("./Book");

const Issuance = sequelize.define("Issuance", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  issueDate: { type: DataTypes.DATE, allowNull: false },
  returnDate: { type: DataTypes.DATE, allowNull: true },
});

Issuance.belongsTo(Member);
Issuance.belongsTo(Book);

module.exports = Issuance;
