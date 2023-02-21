import React, { useEffect } from 'react'
import styles from './leaderboard.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchLeaderboardAll, sortTableByColumn, toggleCurrentSort } from '@/store/slices/leaderboard'
import { leaderboardDataRequest } from '@/constants/configs/leaderboard'
import NesAvatar from '@/components/UI/nes-avatar'
import NesButton from '@/components/UI/nes-button'
import ErrorBoundary from '@/components/error-boundary'
import ErrorFallback from '@/components/UI/error-fallback'

const Leaderboard: React.FC = () => {
  
  const dispatch = useAppDispatch()

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
      label: 'NAME',
      sortable: true
    },
    {
      name: 'score',
      label: 'SCORE',
      sortable: true
    },
    {
      name: 'date',
      label: 'DATE',
      sortable: true
    }
  ]
  
  useEffect(() => {
    dispatch(fetchLeaderboardAll(leaderboardDataRequest))
  },[])
  
  const navigate = useNavigate()
  
  const tableData = useAppSelector(state => state.leaderboard.tableData)
  const loading = useAppSelector(state => state.leaderboard.isLeaderboardLoading)
  const leaderboardError = useAppSelector(state => state.leaderboard.leaderboardError)
  
  const sortColumn = (columnName: string) => {
    dispatch(toggleCurrentSort(columnName))
    dispatch(sortTableByColumn())
  }
  
  const userRows = React.useMemo(
    () => {
      if (!tableData.length) {
        return <></>
      }
      
      return tableData.map((user, index) => {
        
        const rowDarkClass = index % 2 === 1 ? 'nes-container is-dark' : ''
        return (
          <div
            key={`${user.userId}-${index}`}
            className={`${styles['table__row']} ${rowDarkClass}`}>
            <div className={styles['table__col']}>
              {user.id}
            </div>
            <div
              className={`${styles['table__col']} ${styles['avatar-col']}`}>
              <NesAvatar
                image={user.avatar}
                size={'large'}
                alt={`аватар пользователя ${user.name}`}
              />
            </div>
            <div className={styles['table__col']}>
              {user.name}
            </div>
            <div className={styles['table__col']}>
              {user.score}
            </div>
            <div className={styles['table__col']}>
              {user.date}
            </div>
          </div>
        )
      })
    }, [tableData]
  )
  
  const tableHeaders = tableHeadersProps.map((header, index) => {
    //TODO: add change arrow when sorting
    return (
      <div key={`${index}-${header.name}`}
           className={`${styles['table__col']} ${header.sortable ? styles['sort-arrows'] : ''}`}
           onClick={header.sortable ? () => sortColumn(header.name) : undefined }
      >
        {header.label}
      </div>
    )
  })
  return (
    <div className={styles['leaderboard']}>
      <div className={styles['leaderboard__container']}>
        <div className={styles['table']}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {tableHeaders}
            {
              loading
                ?
                <div style={{ gridColumn: 'span 5' }}><p>Is loading...</p></div>
                :
                leaderboardError
                  ?
                  <div style={{ gridColumn: 'span 5' }}><p>Something went wrong..</p></div>
                  :
                  !tableData.length
                    ?
                    <div style={{ gridColumn: 'span 5' }}><p>Leaderboard is empty.<br />Be first!</p></div>
                    :
                    <>{ userRows }</>
            }
          
          </ErrorBoundary>
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

export default Leaderboard
