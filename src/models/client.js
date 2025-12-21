import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    tableName: 'client',
    timestamps: false,
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Client.associate = (models) => {
    Client.hasMany(models.ClientWarehouse, {
        foreignKey: 'client_id',
        as: 'warehouses',
    });
    Client.hasMany(models.ClientApiToken, {
        foreignKey: 'client_id',
        as: 'api_tokens',
    });
    Client.hasMany(models.Package, {
        foreignKey: 'client_id',
        as: 'packages',
    });
}

export default Client;