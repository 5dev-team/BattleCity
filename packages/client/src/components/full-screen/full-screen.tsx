import React, { useState } from 'react'
import styles from './full-screen.module.scss'
import fullScreenIconButton from '@/assets/svg/fullScreenIconButton.svg'
import { Outlet } from 'react-router-dom'

type HTMLElementWithBrowsersFunctions = HTMLElement & {
  mozRequestFullScreen(): Promise<void>
  webkitRequestFullscreen(): Promise<void>
  msRequestFullscreen(): Promise<void>
}

type HTMLDcoumentWithBrowsersFunctionns = Document & {
  mozCancelFullScreen(): Promise<void>
  webkitExitFullscreen(): Promise<void>
  msExitFullscreen(): Promise<void>
}

const FullScreen = () => {
  const [textButton, setTextButton] = useState<string>('Click Full Screen')
  const [activeFullScreen, setActiveFullScreen] = useState<boolean>(false)
  const handleFullScreenToggle = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    const docElmWithBrowsersFullScreenFunctions =
      document.documentElement as HTMLElementWithBrowsersFunctions

    const docWithBrowsersExitFunctions =
      document as HTMLDcoumentWithBrowsersFunctionns

    if (!activeFullScreen) {
      setActiveFullScreen(prev => !prev)
      activateFullscreen(docElmWithBrowsersFullScreenFunctions)
      setTextButton('Exit Full Screen')
    }
    if (activeFullScreen) {
      setActiveFullScreen(prev => !prev)
      deactivateFullscreen(docWithBrowsersExitFunctions)
      setTextButton('Click Full Screen')
    }
  }

  const activateFullscreen = (element: HTMLElementWithBrowsersFunctions) => {
    if (element.requestFullscreen) {
      element.requestFullscreen().then()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen().then()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen().then()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen().then()
    }
  }

  const deactivateFullscreen = (
    element: HTMLDcoumentWithBrowsersFunctionns
  ) => {
    if (element.exitFullscreen) {
      element.exitFullscreen().then()
    } else if (element.mozCancelFullScreen) {
      element.mozCancelFullScreen().then()
    } else if (element.webkitExitFullscreen) {
      element.webkitExitFullscreen().then()
    }
  }

  return (
    <>
      <div className={styles['full-screen-button']}>
        <img
          onClick={e => {
            handleFullScreenToggle(e)
          }}
          src={fullScreenIconButton}
          alt={textButton}
          className={styles['full-screen-button__image']}
        />
      </div>
      {<Outlet />}
    </>
  )
}

export default FullScreen
