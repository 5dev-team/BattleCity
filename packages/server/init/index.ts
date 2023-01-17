import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { forumModel, forumPostsModel } from '../models'
import { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from '../utils/constants'

console.log(POSTGRES_DB)
const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
}

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

// Инициализируем модели
export const Forum = sequelize.define('forum', forumModel, { timestamps: true })
export const ForumPosts = sequelize.define('forumPosts', forumPostsModel, {})



export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    Forum.hasMany(ForumPosts)
    ForumPosts.belongsTo(Forum)
    await sequelize.sync({ force: true }) // Синхронизация базы данных
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
