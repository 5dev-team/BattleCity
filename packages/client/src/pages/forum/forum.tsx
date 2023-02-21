import React, { useEffect, useState } from 'react'
import styles from './forum.module.scss'
import NesButton from '@/components/UI/nes-button'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'
import api from '@/api'
import { IForum } from '@/api/forum/forum.models'

const Forum: React.FC = () => {
  const [addThemeText, setAddThemeText] = useState('')

  const [themes, setThemes] = useState<IForum[]>([])

  useEffect(() => {
    api.forum.getForums().then(res => {
      setThemes(res.data)
    })
  }, [])

  const onAddThemeClick = () => {
    if (addThemeText) {
      api.forum.createForum({ title: addThemeText }).then(res => {
        setThemes([...themes, res.data])
        setAddThemeText('')
      })
    }
  }

  return (
    <div className={styles['forum']}>
      <div className={styles['forum-add-them']}>
        <NesButton variant='warning' onClick={() => onAddThemeClick()}>
          Add
        </NesButton>
        <NesInput
          inline
          value={addThemeText}
          label='theme'
          onChange={e => setAddThemeText(e.target.value)}
        />
      </div>
      <div className={styles['forum-header']}>
        <div className={styles['forum-header-item']}>Theme</div>
        <div className={styles['forum-header-item']}>Author</div>
        <div className={styles['forum-header-item']}>Answers</div>
        <div className={styles['forum-header-item']}>Last</div>
      </div>
      <div className={styles['forum-themes']}>
        <div className={styles['forum-themes-box']}>
          {themes.map(theme => (
            <NesLink
              to={theme.id.toString()}
              key={theme.id}
              className={styles['forum-theme']}>
              <div className={styles['forum-theme-item']}>{theme.title}</div>
              <div className={styles['forum-theme-item']}>
                {theme.authorName}
              </div>
              <div className={styles['forum-theme-item']}>
                {theme.countMessage}
              </div>
              <div className={styles['forum-theme-item']}>
                {theme.lastMessageDate ? new Date(theme.lastMessageDate).toLocaleString() : ''}
              </div>
            </NesLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Forum
