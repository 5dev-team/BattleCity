import React, { ReactNode, useState } from 'react'
import NesButton from '@/components/UI/nes-button'
import styles from './full-screen.module.scss'


interface IProps {
  children: ReactNode
}

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

const FullScreen = ({ children }: IProps) => {
  const [textButton, setTextButton] = useState<string>('Click Full Screen')
  const handleFullScreenToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElementWithBrowsersFunctions

    const docWithBrowsersExitFunctions = document as HTMLDcoumentWithBrowsersFunctionns

    if (textButton === 'Click Full Screen') {
      activateFullscreen(docElmWithBrowsersFullScreenFunctions)
      setTextButton('Exit Full Screen')
    }
    if (textButton === 'Exit Full Screen') {
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

  const deactivateFullscreen = (element: HTMLDcoumentWithBrowsersFunctionns) => {
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
      <div className={styles['header']}>
        <NesButton onClick={(e) => {
          handleFullScreenToggle(e)
        }}>
          {textButton}
        </NesButton>
      </div>
      {children}
    </>
  )
}

export default FullScreen
