import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const PackageStatusHistory = sequelize.define(
   'PackageStatusHistory',
   {
      id: {
         type: DataTypes.BIGINT,
         primaryKey: true,
         autoIncrement: true,
      },
      package_id: {
         type: DataTypes.BIGINT,
         allowNull: false,
      },
      package_status_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      author_type: {
         type: DataTypes.STRING(50),
         allowNull: false,
      },
      author_id: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      courier_id: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      notes: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      checkin_issue: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      evidence_photo: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      person_received: {
         type: DataTypes.STRING(100),
         allowNull: true,
      },
      person_relationship: {
         type: DataTypes.STRING(100),
         allowNull: true,
      },
      created_at: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
      },
   },
   {
      tableName: 'package_status_history',
      timestamps: false,
      underscored: true,
   }
);

PackageStatusHistory.associate = models => {
   PackageStatusHistory.belongsTo(models.Package, {
      foreignKey: 'package_id',
      as: 'package',
   });
   PackageStatusHistory.belongsTo(models.PackageStatus, {
      foreignKey: 'package_status_id',
      as: 'package_status',
   });
   PackageStatusHistory.belongsTo(models.Courier, {
      foreignKey: 'courier_id',
      as: 'courier',
   });
};

export default PackageStatusHistory;
