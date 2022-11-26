import React from 'react'
import styles from './leaderboard.module.scss'
import NesButton from '../../components/UI/nes-button'
import Avatar from '../../components/UI/avatar'

const LeaderBoard: React.FC = () => {

  const avatarMock = 'https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-218721-1024x1024.jpeg'

  const loadMore = () => {
    console.log('load more')
  }

  return (
    <div className={styles['leaderboard']}>
      <div className={styles['leaderboard__container']}>
        <div className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}>
          <NesButton onClick={loadMore}>
            &lt;
          </NesButton>
          <NesButton onClick={loadMore}>
            &gt;
          </NesButton>
        </div>
        <div className={`${styles['leaderboard__table']} ${styles['table']}`}>

          <div className={`${styles['table__col']} ${styles['table-header']}`}>ID</div>
          <div className={`${styles['table__col']} ${styles['table-header']}`}>AVATAR</div>
          <div className={`${styles['table__col']} ${styles['table-header']}`}>NAME</div>
          <div className={`${styles['table__col']} ${styles['table-header']}`}>SCORE</div>
          <div className={`${styles['table__col']} ${styles['table-header']}`}>DATE</div>

          <div className={styles['table__row']}>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>1</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']} ${styles['avatar-col']}`}>
              <Avatar image={avatarMock} size={'large'} alt={'аватар пользователя Username'} />
            </div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>Username</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>1124234</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>07/10/15</div>
          </div>
          <div className={`${styles['table__row']} nes-container is-dark`}>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>1</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>avatar</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>Username</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>1124234</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>07/10/15</div>
          </div>
        </div>
        <div className={styles['control-wrapper']}>
          <NesButton onClick={loadMore} variant='primary'>
            exit
          </NesButton>
        </div>
      </div>

    </div>
  )
}

export default LeaderBoard