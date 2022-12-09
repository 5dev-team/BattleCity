import React from 'react'
import styles from './error404.module.scss'
import NesLink from '@/components/UI/nes-link'
import {RoutePaths} from '@/App'

const Error404: React.FC = () => {
    return (
        <div className={styles["error404-wrapper"]}>
            <h2 className='error404__title'>404</h2>
            <p className='error404__text'>Page not found</p>
            <NesLink
                to={RoutePaths.SIGNIN}
            >
                Back to main page
            </NesLink>
        </div>
    )
}

export default Error404
