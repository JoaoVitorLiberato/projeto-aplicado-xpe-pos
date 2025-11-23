import { DataTypes } from "sequelize"
import Database from "../ConnectDb.infrastructure.database";

export const OrderModel = Database.define(
 "orders",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    canal: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    segmento: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endereco: {
      type: DataTypes.JSON,
      allowNull: true
    },
    mensagem: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pagamento: {
      type: DataTypes.JSON,
      allowNull: true
    },
    analytics: {
      type: DataTypes.JSON,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    modelName: "orders",
    timestamps: true,
    underscored: false
  }
);
