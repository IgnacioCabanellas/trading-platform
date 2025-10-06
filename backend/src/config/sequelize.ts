import { ModelCtor, Sequelize } from 'sequelize-typescript';

import { environment } from '@/config/environment';
import { Asset } from '@/models/asset.model';
import { Limit } from '@/models/limit.model';
import { User } from '@/models/user.model';

const models: ModelCtor[] = [User, Limit, Asset];

export const sequelize = new Sequelize(environment.databaseUrl, {
  dialect: 'postgres',
  models,
  define: {
    underscored: true,
    timestamps: true,
  },
});
