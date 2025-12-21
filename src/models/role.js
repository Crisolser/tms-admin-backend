import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, 
{
    tableName: 'role',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Role.associations = (models) => {
    Role.belongsToMany(models.Admin, {
        through: models.AdminRole,
        foreignKey: 'role_id',
        otherKey: 'admin_id',
        as: 'admins',
    });
}

export default Role;