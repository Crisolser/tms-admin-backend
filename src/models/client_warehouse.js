import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';
import Client from './client';

const ClientWarehouse = sequelize.define('ClientWarehouse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    contact_person: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
    },
    additional_instructions: {
        type: DataTypes.STRING(500),
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
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    tableName: 'client_warehouse',
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

ClientWarehouse.associate = (models) => {
    ClientWarehouse.belongsTo(models.Client, {
        foreignKey: 'client_id',
        as: 'client',
    });
    ClientWarehouse.hasMany(models.Package, {
        foreignKey: 'client_warehouse_id',
        as: 'packages',
    });
}

export default ClientWarehouse;