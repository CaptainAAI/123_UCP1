const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Hotel = sequelize.define('Tentrem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Tipe_Kamar: {
    type: DataTypes.VARCHAR(50),
    allowNull: false
  },
  Kapasitas_Tamu: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2
  },
  Lantai: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  Fasilitas: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'hotel',
  timestamps: true,
  createdAt: 'Tanggalpesan',
  updatedAt: 'Tanggalupdate'
});


module.exports = Hotel;
