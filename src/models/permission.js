import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const Permission = sequelize.define(
   'Permission',
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      code: {
         type: DataTypes.STRING(40),
         allowNull: false,
         unique: true,
      },
      action: {
         type: DataTypes.STRING(50),
         allowNull: false,
      },
      module: {
         type: DataTypes.STRING(50),
         allowNull: false,
      },
      description: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      created_at: {
         type: DataTypes.DATE,
         allowNull: false,
         defaultValue: DataTypes.NOW,
      },
      updated_at: {
         type: DataTypes.DATE,
         allowNull: true,
      },
   },
   {
      tableName: 'permission',
      timestamps: false,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
   }
);

Permission.associate = models => {
   Permission.belongsToMany(models.Role, {
      through: models.RolePermission,
      foreignKey: 'permission_id',
      otherKey: 'role_id',
      as: 'roles',
   });
};

export default Permission;
