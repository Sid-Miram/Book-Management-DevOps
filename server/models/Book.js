const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define("Book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Book;
