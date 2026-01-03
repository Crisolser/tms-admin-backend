import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const ClientApiToken = sequelize.define('ClientApiToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
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
},
{
    tableName: 'client_api_token',
    timestamps: false,
    underscored: true,
    createdAt: 'created_at',
});

ClientApiToken.associate = (models) => {
    ClientApiToken.belongsTo(models.Client, {
        foreignKey: 'client_id',
        as: 'client',
    });
}

export default ClientApiToken;