import React from 'react'
import styles from './leaderboard.module.scss'
import NesButton from '../../components/UI/nes-button'
import NesAvatar from '../../components/UI/nes-avatar'
import { useNavigate } from 'react-router-dom'

const LeaderBoard: React.FC = () => {

  const loadNextPage = () => {
    console.log('load next page')
  }
  const loadPrevPage = () => {
    console.log('load prev page')
  }

  const navigate = useNavigate();

  return (
    <div className={styles['leaderboard']}>
      <div className={styles['leaderboard__container']}>
        <div className={`${styles['control-wrapper']} ${styles['control-page-buttons']}`}>
          <NesButton onClick={loadPrevPage}>
            &lt;
          </NesButton>
          <NesButton onClick={loadNextPage}>
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
            <div
              className={`${styles['table__col']} ${styles['table__col--second-color']} ${styles['nes-avatar-col']}`}>
              <NesAvatar size={'large'} alt={'аватар пользователя Username'} />
            </div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>Username</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>1124234</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>07/10/15</div>
          </div>
          <div className={`${styles['table__row']} nes-container is-dark`}>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>1</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>
              <NesAvatar size={'large'} alt={'аватар пользователя Username2'} />
            </div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>Username2</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>43546435</div>
            <div className={`${styles['table__col']} ${styles['table__col--second-color']}`}>07/10/16</div>
          </div>
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