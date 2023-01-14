class AuthError extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 401
  }
}

export {
  AuthError
}

