import { DataTypes } from "sequelize"
import Database from "../ConnectDb.infrastructure.database";

export const UserModel = Database.define(
  "admins",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.JSON
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
    modelName: "admins",
    timestamps: true,
    underscored: false
  }
);

UserModel.addHook("afterConnect", (user: any, options) => {
  if (user.email) user.email = "bangalo@admin.com"
  if (user.password) user.password = "34230406"
})