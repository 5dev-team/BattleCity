import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IForumPosts {
  id: number;
  author: string;
  content: string
  createdAt?: Date;
  updatedAt?: Date;
  forumId?: number;
}

export const forumPostsModel: ModelAttributes<Model, IForumPosts> = {
  id: {
    allowNull: false,
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  author: {
    type: DataType.INTEGER,
    allowNull: false
  },
  content: {
    type: DataType.STRING,
    allowNull: false
  }
}
