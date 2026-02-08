import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const Vehicle = sequelize.define(
   'Vehicle',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
   },
   {
      tableName: 'vehicle',
      timestamps: false,
      underscored: true,
   }
);

Vehicle.associate = models => {
   Vehicle.hasMany(models.Courier, {
      foreignKey: 'vehicle_id',
      as: 'couriers',
   });
};

export default Vehicle;
