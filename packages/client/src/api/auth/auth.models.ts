export interface ILoginRequest {
  login: string,
  password: string
}

export interface IRegisterRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}
