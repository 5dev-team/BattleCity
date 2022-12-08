import React from 'react'
import styles from './error500.module.scss'
import NesLink from '@/components/UI/nes-link'
import {RoutePaths} from '@/App'

const Error500: React.FC = () => {
    return (
        <div className={styles["error500-wrapper"]}>
            <h2 className='error500__title'>500</h2>
            <p className='error500__text'>Internal server Error</p>
            <NesLink
                to={RoutePaths.SIGNIN}
            >
                Back to main page
            </NesLink>
        </div>
    )
}

export default Error500
