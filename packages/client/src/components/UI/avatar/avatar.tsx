import React, { ButtonHTMLAttributes } from 'react'
import styles from './avatar.module.scss'

interface IAvatar extends ButtonHTMLAttributes<HTMLImageElement> {
  size?: 'small' | 'medium' | 'large'
  image?: string
  alt?: string
  rounded?: boolean
}

const Avatar: React.FC<IAvatar> = ({ image, alt, size, rounded, ...props }) => {
  const avatarMock = 'https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-218721-1024x1024.jpeg'

  return (
    <img className={`nes-avatar is-${size} ${rounded ? 'is-rounded' : ''}${styles['avatar']}`}
         src={image || avatarMock}
         alt={alt || 'аватар пользователя'}
         style={{ imageRendering: 'pixelated' }}
    />
  )

}


export default Avatar