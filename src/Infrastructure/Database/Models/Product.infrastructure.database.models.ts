import { DataTypes } from "sequelize";
import Database from "../ConnectDb.infrastructure.database";
import { CategoryModel } from "./Category.infrastructure.database.models";

export const ProductModel = Database.define(
  "products",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    tumbnail: {
      type: DataTypes.JSON,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.JSON,
      allowNull: false
    },
    differences: {
      type: DataTypes.JSON,
      allowNull: false
    },
    note_client: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: CategoryModel,
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
    tableName: "products",
    timestamps: true,
    underscored: false
  }
);

CategoryModel.hasMany(ProductModel);
ProductModel.belongsTo(CategoryModel, { foreignKey: "categoryId" })
