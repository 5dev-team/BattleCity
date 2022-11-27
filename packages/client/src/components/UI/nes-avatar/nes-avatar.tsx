import React, { ImgHTMLAttributes } from 'react'
import styles from './nes-avatar.module.scss'
import avatarPlaceholder from '../../../assets/avatarPlaceholder.png'


interface IAvatar extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'small' | 'medium' | 'large'
  image?: string
  rounded?: boolean
}

const NesAvatar: React.FC<IAvatar> = ({ image, alt, size, rounded , ...props}) => {

  return (
    <img className={`nes-avatar is-${size} ${rounded ? 'is-rounded' : ''} ${styles['avatar']}`}
         src={image || avatarPlaceholder}
         alt={alt || 'аватар пользователя'}
         style={{ imageRendering: 'pixelated' }}
         {...props}
    />
  )

}


export default NesAvatar