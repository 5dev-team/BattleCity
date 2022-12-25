type PatternType = 'firstName' | 'secondName' | 'login' | 'displayName' | 'email' | 'password' | 'phone'

export const getPattern = (type: PatternType): RegExp => {
  switch (type) {
    case 'firstName':
    case 'secondName':
      return /[A-Z][a-z-]+|[А-Я][а-я-]+/g
    case 'login':
    case 'displayName':
      return /(?:(?!\d+$)[\da-zA-Z_-]+){3,20}/g
    case 'email':
      return /\w+@\w+\.\w+/g
    case 'password':
      return /^(?=.*\d)^(?=.*[A-Z]).{8,40}/g
    case 'phone':
      return /^\+?\d{10,15}$/g
  }
}
