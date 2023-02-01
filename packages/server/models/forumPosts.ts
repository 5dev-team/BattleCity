import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IForumPosts {
  id: number;
  authorId: number;
  content: string
  createdAt?: Date | number;
  updatedAt?: Date | number;
  forumId?: number;
  rootPost: number | null
}

export const forumPostsModel: ModelAttributes<Model, IForumPosts> = {
  id: {
    allowNull: false,
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  authorId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  content: {
    type: DataType.STRING,
    allowNull: false
  },
  rootPost: {
    type: DataType.INTEGER,
    allowNull: true
  }
}
