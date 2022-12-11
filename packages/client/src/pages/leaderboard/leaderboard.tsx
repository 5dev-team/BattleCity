import React, { useEffect, useState } from 'react'
import styles from './leaderboard.module.scss'
import NesButton from '../../components/UI/nes-button'
import NesAvatar from '../../components/UI/nes-avatar'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchLeaderboardAll, selectLeaderboardDataPerPage } from '@/store/slices/leaderboard'
import { ILeaderboardRequest, IUserScore } from '@/api/leaderboard/leaderboard.models'
import { LEADERBOARD_RATING_FIELD_NAME } from '@/constants'

export const ITEMS_PER_PAGE = 2

const LeaderBoard: React.FC = () => {
  
  const [page, setPage] = useState(0)
  const [hideNextPageBtn, setHideNextPageBtn] = useState(false)
  const dispatch = useAppDispatch()
  const leaderboardDataRequest: ILeaderboardRequest = {
    ratingFieldName: LEADERBOARD_RATING_FIELD_NAME,
    cursor: page * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE
  }
  // console.log(leaderboardDataRequest)
  
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
  
  const totalCount = useAppSelector(state => state.leaderboard.totalCount)
  console.log(totalCount)
  const lastPage = totalCount/ITEMS_PER_PAGE
  
  const loadNextPage = () => {
    //TODO: отключать кнопку, если последняя страница, также не менять стейт, если пришел пустой запрос
    if (lastPage === 0 || page < lastPage) {
      console.log('больше')
      setPage(page + 1)
    }
    
  }
  const loadPrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  console.log('last page: ' + lastPage)
  // if (totalCount !== 0 && lastPage === page) {
  //   setPage(page - 1)
  //    setHideNextPageBtn(true)
  // } else if (hideNextPageBtn && lastPage === page + 1) {
  //   setHideNextPageBtn(false)
  // }
  
  // const tableData = useAppSelector(state => state.leaderboard.tableData)
  const selectLeaderboardData = useAppSelector(state => state.leaderboard.tableData)
  const tableData: Array<IUserScore> = selectLeaderboardDataPerPage(selectLeaderboardData, page)
  const loading = useAppSelector(state => state.leaderboard.isLeaderboardLoading)
  const isFullLoaded = useAppSelector(state => state.leaderboard.isFullLoaded)

  
  console.log('page:' + page)
  console.log('total: ' + totalCount)
  

  
  useEffect(() => {
    if (!isFullLoaded) {
      dispatch(fetchLeaderboardAll(leaderboardDataRequest))
    }
  }, [page])
  
  const userRows = React.useMemo(
    () => {
      if (!tableData) {
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
    return (
      <div key={index} className={styles['table__col']}>
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
          {!hideNextPageBtn && <NesButton onClick={loadNextPage}>&gt;</NesButton>}
          
        </div>
        <div className={styles['table']}>
          {tableHeaders}
          {loading && <div style={{ gridColumn: 'span 5' }}><p>Is loading...</p></div>}
          {!tableData && <div style={{ gridColumn: 'span 5' }}><p>Leaderboard is empty.<br />Be first!</p></div>}
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
