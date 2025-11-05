const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Karyawan = sequelize.define('Karyawan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jabatan: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gaji: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'karyawan',
  timestamps: true
});

module.exports = Karyawan;
