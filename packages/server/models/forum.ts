import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IForum extends IForumModel {
  authorName: string
  countMessage: number
  lastMessageDate: number | null
  lastMessageId: number | null
}

export interface IForumModel {
  id: number
  authorId: number
  title: string
  createdAt: Date | number
  updatedAt?: Date | number
}

export const forumModel: ModelAttributes<Model, IForumModel> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  authorId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  createdAt: DataType.DATE,
  updatedAt: DataType.DATE,
}
