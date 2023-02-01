import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IForum {
  id: number;
  authorId: number;
  title: string;
  createdAt?: Date | number;
  updatedAt?: Date | number;
  countMessage?: number | null;
  lastMessageDate?: number | null;
  lastMessageId?: number | null
}


export const forumModel: ModelAttributes<Model, IForum> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  authorId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  title: {
    type: DataType.STRING,
    allowNull: false
  }
}
