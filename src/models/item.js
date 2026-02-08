import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const Item = sequelize.define(
   'Item',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      package_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      sku: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
      description: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      weight: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: true,
      },
      value: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: true,
      },
   },
   {
      tableName: 'item',
      timestamps: false,
      underscored: true,
   }
);

Item.associate = models => {
   Item.belongsTo(models.Package, {
      foreignKey: 'package_id',
      as: 'package',
   });
};

export default Item;
