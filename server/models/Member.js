const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Member = sequelize.define("Member", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = Member;
