import React, {useMemo, useState} from 'react'
import styles from './forum.module.scss'
import NesButton from '@/components/UI/nes-button'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'

export interface IForumThemesType {
    title: string,
    author: string,
    answers: number,
    lastAnswer: string,
}

const Forum: React.FC = () => {
    const [text, setText] = useState('')

    const templateThem = {
        title: text,
        author: 'Admin',
        answers: 0,
        lastAnswer: new Date().toISOString().split('T')[0],
    }

    const [themes, setThem] = useState([
        {
            title: 'WorldOfTank',
            author: 'Admin',
            answers: 27,
            lastAnswer: '2022-10-12',
        },
        {
            title: 'TankOfWorld',
            author: 'Domin',
            answers: 9,
            lastAnswer: '2022-11-11',
        },
        {
            title: 'WorldOfWorld',
            author: 'Mindon',
            answers: 11,
            lastAnswer: '2022-04-04',
        }
    ])

    const addThemes = (themes: Array<IForumThemesType>) => {
        return themes
            .map((theme, id) => <NesLink to={theme.title} key={id} className={styles['forum-theme']}>{Object.values(theme)
            .map((el, id) => <div key={id} className={styles['forum-theme-item']}>{el}</div>)}</NesLink>)
    }

    const addThem = useMemo(() => (themes: Array<IForumThemesType>, templateThem: IForumThemesType): void => {
        if (templateThem.title) {
          setThem([...themes, templateThem])
        }
    }, [themes])

    return (
        <div className={styles['forum']}>
            <div className={styles['forum-add-them']}>
                <NesButton 
                    variant='warning'
                    onClick={() => {
                        addThem(themes, templateThem)
                        setText('')
                    }}
                >
                    Append
                </NesButton>
                <NesInput
                    inline
                    value = {text}
                    label='theme'
                    onChange={(evt) => {
                        setText(evt.target.value)
                    }}
                />
            </div>
            <div className={styles['forum-header']}>
                <div className={styles['forum-header-item']}>Theme</div>
                <div className={styles['forum-header-item']}>Author</div>
                <div className={styles['forum-header-item']}>Answers</div>
                <div className={styles['forum-header-item']}>Last</div>
            </div>
            <div className={styles['forum-themes']}>{addThemes(themes)}</div>
        </div>
    )
}

export default Forum
