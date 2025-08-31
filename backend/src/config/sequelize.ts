import { Sequelize } from "sequelize-typescript";

import { User } from "../models/user.model";

import { environment } from "./environment";

const models = [User];

export const sequelize = new Sequelize(environment.databaseUrl, {
  dialect: "postgres",
  models,
  define: {
    underscored: true,
    timestamps: true,
  },
});
