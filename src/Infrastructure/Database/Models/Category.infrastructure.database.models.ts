import { DataTypes } from "sequelize";
import Database from "../ConnectDb.infrastructure.database";

export const CategoryModel = Database.define(
  "categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
    {
    modelName: "categories",
    timestamps: true,
    underscored: false
  }
)
