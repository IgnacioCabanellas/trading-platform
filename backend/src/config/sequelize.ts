import { Sequelize } from 'sequelize-typescript';

import { environment } from '@/config/environment';
import { Limit } from '@/models/limit.model';
import { User } from '@/models/user.model';

const models = [User, Limit];

export const sequelize = new Sequelize(environment.databaseUrl, {
  dialect: 'postgres',
  models,
  define: {
    underscored: true,
    timestamps: true,
  },
});
