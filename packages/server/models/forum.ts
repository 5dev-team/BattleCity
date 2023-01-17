import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IForum {
  id: number;
  owner_id: number;
  title: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const forumModel: ModelAttributes<Model, IForum> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  owner_id: {
    type: DataType.INTEGER,
    allowNull: false
  },
  title: {
    type: DataType.STRING,
    allowNull: false
  },
  author: {
    type: DataType.STRING,
    allowNull: false
  }
}
