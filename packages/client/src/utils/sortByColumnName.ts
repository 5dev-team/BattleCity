import { IUserScore } from '@/api/leaderboard/leaderboard.models'

const sortByColumnName = (array: Array<IUserScore>, columnName: string, direction: 'asc' | 'desc'): Array<IUserScore> => {
  console.log(columnName)
  console.log(direction)
  switch (columnName) {
    case 'name':
      return array.sort((a, b) => {
        if (direction === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })
    case 'date':
      return array.sort((a, b) => {
        const da = a.date.split('-').map(Number)
        const db = b.date.split('-').map(Number)
        const dateA = new Date(da[2],da[1],da[0])
        const dateB = new Date(db[2],db[1],db[0])
        const timeA = dateA.getTime()
        const timeB = dateB.getTime()

        if (direction === 'asc') {
          return timeA - timeB
        } else {
          return timeB - timeA
        }
      })
    case 'score':
      return array.sort((a, b) => {
        if (direction === 'asc') {
          return a.score - b.score
        } else {
          return b.score - a.score
        }
      })
    default:
      return array
    
  }
  
}

export default sortByColumnName
