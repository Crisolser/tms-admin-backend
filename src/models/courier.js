import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const Courier = sequelize.define('Courier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    paternal_surname: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    maternal_surname: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
    vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    profile_photo: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
    tableName: 'courier',
    timestamps: true,
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Courier.associate = (models) => {
    Courier.belongsTo(models.Vehicle, {
        foreignKey: 'vehicle_id',
        as: 'vehicle',
    });
    Courier.hasMany(models.CourierDocument, {
        foreignKey: 'courier_id',
        as: 'documents',
    });
    Courier.hasMany(models.Package, {
        foreignKey: 'courier_id',
        as: 'packages',
    });
}

export default Courier;