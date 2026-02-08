import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const CourierDocument = sequelize.define(
   'CourierDocument',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      courier_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      document_type_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      file_name: {
         type: DataTypes.STRING(255),
         allowNull: false,
         unique: true,
      },
      status: {
         type: DataTypes.INTEGER,
         allowNull: false,
         defaultValue: 1,
      },
      created_at: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
      },
   },
   {
      tableName: 'courier_document',
      timestamps: false,
      underscored: true,
      createdAt: 'created_at',
   }
);

CourierDocument.associate = models => {
   CourierDocument.belongsTo(models.Courier, {
      foreignKey: 'courier_id',
      as: 'courier',
   });
   CourierDocument.belongsTo(models.DocumentType, {
      foreignKey: 'document_type_id',
      as: 'document_type',
   });
};

export default CourierDocument;
