import { ModelCtor, Sequelize } from 'sequelize-typescript';

import { environment } from '@/config/environment';
import { Asset } from '@/models/asset.model';
import { Balance } from '@/models/balance.model';
import { Limit } from '@/models/limit.model';
import { Movement } from '@/models/movement.model';
import { TradingPair } from '@/models/trading-pair.model';
import { User } from '@/models/user.model';

const models: ModelCtor[] = [
  User,
  Limit,
  Asset,
  TradingPair,
  Balance,
  Movement,
];

export const sequelize = new Sequelize(environment.databaseUrl, {
  dialect: 'postgres',
  models,
  define: {
    underscored: true,
    timestamps: true,
  },
});
