import React, { ReactNode, useState } from 'react'
import NesButton from '@/components/UI/nes-button'
import styles from './full-screen.module.scss'


interface IProps {
  children: ReactNode
}

interface IElement extends HTMLDocument {
  requestFullscreen: () => void
  mozRequestFullScreen: () => void
  webkitRequestFullscreen: () => void
  msRequestFullscreen: () => void
}

interface IDocumentCopy extends Document {
  exitFullscreen: () => Promise<void>
  mozCancelFullScreen: () => Promise<void>
  webkitExitFullscreen: () => Promise<void>
}

const FullScreen = ({ children }: IProps) => {
  const [textButton, setTextButton] = useState<string>('Click Full Screen')
  const handleFullScreenToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const element = document.documentElement as unknown as IElement
    const documentEl = document as unknown as IDocumentCopy
    if (textButton === 'Click Full Screen') {
      activateFullscreen(element)
      setTextButton('Exit Full Screen')
    }
    if (textButton === 'Exit Full Screen') {
      deactivateFullscreen(documentEl)
      setTextButton('Click Full Screen')
    }
  }

  const activateFullscreen = (element: IElement) => {

    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  }

  const deactivateFullscreen = (element: IDocumentCopy) => {
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
