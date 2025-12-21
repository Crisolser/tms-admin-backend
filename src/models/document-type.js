import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const DocumentType = sequelize.define('DocumentType', {
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
    tableName: 'document_type',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

DocumentType.associate = (models) => {
    DocumentType.hasMany(models.CourierDocument, {
        foreignKey: 'document_type_id',
        as: 'courier_documents',
    });
}

export default DocumentType;