import React, { useEffect, useState } from 'react'
import styles from './leaderboard.module.scss'
import NesButton from '../../components/UI/nes-button'
import NesAvatar from '../../components/UI/nes-avatar'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchLeaderboardAll } from '@/store/slices/leaderboard'
import { ILeaderboardRequest } from '@/api/leaderboard/leaderboard.models'
import { LEADERBOARD_RATING_FIELD_NAME } from '@/constants'

const LeaderBoard: React.FC = () => {
  
  const [page, setPage] = useState(0)
  const ITEMS_PER_PAGE = 2
  const dispatch = useAppDispatch()
  
  const leaderboardDataRequest: ILeaderboardRequest = {
    ratingFieldName: LEADERBOARD_RATING_FIELD_NAME,
    cursor: page * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE
  }
  console.log(leaderboardDataRequest)
  
  //TODO: move to external file?
  const tableHeadersProps = [
    {
      name: 'id',
      label: 'ID'
    },
    {
      name: 'avatar',
      label: 'AVATAR'
    },
    {
      name: 'name',
      label: 'NAME'
    },
    {
      name: 'score',
      label: 'SCORE'
    },
    {
      name: 'date',
      label: 'DATE'
    }
  ]
  
  const navigate = useNavigate()
  
  const loadNextPage = () => {
    setPage(page + 1)
  }
  const loadPrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }
  
  const tableData = useAppSelector(state => state.leaderboard.tableData)
  const loading = useAppSelector(state => state.leaderboard.isLeaderboardLoading)
  
  useEffect(() => {
      dispatch(fetchLeaderboardAll(leaderboardDataRequest))
  }, [page])
  
  const userRows = React.useMemo(
    () => {
      if (!tableData) {
        return <></>
      }
      
      return tableData.map((user, index) => {
        const userRow = Object.entries(user).map(([key, value]) => {
          if (key === 'avatar') {
            return (
              <div
                key={`${user.id}-${value}`}
                className={`${styles['table__col']} ${styles['table__col--second-color']} ${styles['nes-avatar-col']}`}>
                <NesAvatar
                  size={'large'}
                  alt={`аватар пользователя ${user.name}`}
                />
              </div>
            )
          }
          return (
            <div key={`${user.id}-${value}`} className={styles['table__col']}>
              {value}
            </div>
          )
        })
        
        const rowDarkClass = index % 2 === 1 ? 'nes-container is-dark' : ''
        return (
          <div
            key={user.id}
            className={`${styles['table__row']} ${rowDarkClass}`}>
            {userRow}
          </div>
        )
      })
    }, [tableData]
  )
  
  const tableHeaders = tableHeadersProps.map((header, index) => {
    return (
      <div key={index} className={`${styles['table__col']} ${styles['table-header']}`}>
        {header.label}
      </div>
    )
  })
  
  return (
    <div className={styles['leaderboard']}>
      <div className={styles['leaderboard__container']}>
        <div
          className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}>
          <NesButton onClick={loadPrevPage}>&lt;</NesButton>
          <NesButton onClick={loadNextPage}>&gt;</NesButton>
        </div>
        <div className={styles['table']}>
          {tableHeaders}
          {loading && <div style={{gridColumn: 'span 5'}}><p>Is loading...</p></div>}
          {!tableData && <div style={{gridColumn: 'span 5'}}><p>Leaderboard is empty.<br />Be first!</p></div>}
          {userRows}
        </div>
        <div className={styles['control-wrapper']}>
          <NesButton variant='primary' fullWidth onClick={() => navigate('/')}>
            exit
          </NesButton>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard
