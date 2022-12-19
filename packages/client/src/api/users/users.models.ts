export interface IChangeProfileRequest {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface IChangeAvatarRequest {
  avatar: FileList
}

export interface IChangePasswordRequest {
  oldPassword: string
  newPassword: string
}