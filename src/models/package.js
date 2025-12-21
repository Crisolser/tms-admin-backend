import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const Package = sequelize.define('Package', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tracking_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    client_warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    contact_person: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    contact_phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
    },
    referenes: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    additional_instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    internal_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    courier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    package_status_id: {
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
    finished_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    cancelet_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    tableName: 'package',
    timestamps: false,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Package.associate = (models) => {
    Package.belongsTo(models.Client, {
        foreignKey: 'client_id',
        as: 'client',
    });
    Package.belongsTo(models.ClientWarehouse, {
        foreignKey: 'client_warehouse_id',
        as: 'warehouse',
    });
    Package.belongsTo(models.Courier, {
        foreignKey: 'courier_id',
        as: 'courier',
    });
    Package.belongsTo(models.PackageStatus, {
        foreignKey: 'package_status_id',
        as: 'package_status',
    });
    Package.hasMany(models.PackageStatusHistory, {
        foreignKey: 'package_id',
        as: 'status_history',
    });
    Package.hasMany(models.Item, {
        foreignKey: 'package_id',
        as: 'items',
    });
};

export default Package;
    