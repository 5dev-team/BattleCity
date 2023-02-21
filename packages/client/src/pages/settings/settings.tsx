import React, { useEffect, useState } from 'react'
import NesCheckbox from '@/components/UI/nes-checkbox'
import styles from './settings.module.scss'
import { updateUserSettings } from '@/store/slices/auth'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

export const Settings: React.FC = () => {
  const dispatch = useAppDispatch()
  const music = useAppSelector(
    state => state.auth.userSettings.isBackgroundMusic
  )
  const [isMusic, setMusic] = useState(false)

  useEffect(() => {
    setMusic(music)
  }, [music])

  const toggleMusic = () => {
    dispatch(updateUserSettings({ isBackgroundMusic: !isMusic }))
  }

  return (
    <div className={styles['settings-wrapper']}>
      <NesCheckbox
        label='Music'
        checked={isMusic}
        onChange={() => toggleMusic()}
      />
    </div>
  )
}

export default Settings
