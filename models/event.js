'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    event_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    place: DataTypes.TEXT,
    available_start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};