import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ISettings {
  id: number
  userId: number
  isBackgroundMusic: boolean
  createdAt: Date
  updatedAt: Date
}

export const settingsModel: ModelAttributes<Model, ISettings> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  isBackgroundMusic: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
  createdAt: DataType.DATE,
  updatedAt: DataType.DATE,
}
