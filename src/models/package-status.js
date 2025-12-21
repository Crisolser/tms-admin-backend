import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const PackageStatus = sequelize.define('PackageStatus', {
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
},
{
    tableName: 'package_status',
    timestamps: false,
    underscored: true,
});

PackageStatus.associations = (models) => {
    PackageStatus.hasMany(models.Package, {
        foreignKey: 'package_status_id',
        as: 'packages',
    });
    PackageStatus.hasMany(models.PackageStatusHistory, {
        foreignKey: 'package_status_id',
        as: 'package_status_histories',
    });
};

export default PackageStatus;