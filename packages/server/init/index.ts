import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { forumModel, forumPostsModel } from '../models'
import { dataBaseUrl, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from '../utils/constants'

const sequelizeOptions: SequelizeOptions = {
  host: dataBaseUrl,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
  logging: false // отключаем логирование в console!
}

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)


// Инициализируем модели
export const Forum = sequelize.define('forum', forumModel, { timestamps: true })

export const ForumPosts = sequelize.define('forumPosts', forumPostsModel, {})

// Связки
Forum.hasMany(ForumPosts, { onDelete: 'cascade', hooks: true })
ForumPosts.belongsTo(Forum)

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync({ force: false }) // Синхронизация базы данных
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
