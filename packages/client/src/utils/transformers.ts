import { IUser, User } from "@/store/slices/auth/auth.models"

export const transformUser = (user: IUser): User => {
  const avatar = user.avatar? `${__YANDEX_API__}/resources/${user.avatar}` : ''
  return {
    id: user.id,
    firstName: user.first_name,
    secondName: user.second_name,
    displayName: user.display_name ?? user.login,
    login: user.login,
    email: user.email,
    phone: user.phone,
    avatar: avatar,
  } as User
}