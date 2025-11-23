import { DataTypes } from "sequelize"
import Database from "../ConnectDb.infrastructure.database";
import { OrderModel } from "./Order.infrastructure.database.models";

export const ItemsCartModel = Database.define(
 "itemsCart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.JSON,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    differences: {
      type: DataTypes.JSON,
      allowNull: false
    },
    complements: {
      type: DataTypes.JSON,
      allowNull: false
    },
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: OrderModel,
        key: "id"
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    modelName: "itemsCart",
    timestamps: true,
    underscored: false
  }
);

OrderModel.hasMany(ItemsCartModel)
ItemsCartModel.belongsTo(OrderModel, { foreignKey: "orderId" })
