import { IChangeAvatarRequest, IChangeProfileRequest, IChangePasswordRequest } from "@/api/users/users.models"

export interface IFetchProfileData {
  avatarData?: IChangeAvatarRequest
  profileData?: IChangeProfileRequest
  passwordData?: IChangePasswordRequest
}