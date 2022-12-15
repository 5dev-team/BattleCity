import React, {useMemo, useState} from 'react'
import styles from './forum.module.scss'
import NesButton from '@/components/UI/nes-button'
import NesInput from '@/components/UI/nes-input'
import NesLink from '@/components/UI/nes-link'

export type ForumThemesType = {
    title: string,
    author: string,
    answers: number,
    lastAnswer: string,
}

const Forum: React.FC = () => {
    const [templateThem, setTemplateThem] = useState({
        title: '',
        author: 'Admin',
        answers: 0,
        lastAnswer: new Date().toISOString().split('T')[0],
    })

    const [themes, setThem] = useState([
        {
            title: 'WorldOfTank',
            author: 'Admin',
            answers: 27,
            lastAnswer: '12-12-2022',
        },
        {
            title: 'TankOfWorld',
            author: 'Domin',
            answers: 9,
            lastAnswer: '12-12-2022',
        },
        {
            title: 'WorldOfWorld',
            author: 'Mindon',
            answers: 11,
            lastAnswer: '12-12-2022',
        }
    ])

    const getChildrenRoute = (children: ForumThemesType, id: string) => `${id}/${children.title}`

    const addThemes = (themes: Array<ForumThemesType>) => {
        return themes
            .map((theme, id) => <NesLink to={getChildrenRoute(theme, id.toString())} key={id} className={styles['forum-theme']}>{Object.values(theme)
            .map((el, id) => <div key={id} className={styles['forum-theme-item']}>{el}</div>)}</NesLink>)
    }

    const addThem = useMemo(() => (themes: Array<ForumThemesType>, templateThem: ForumThemesType): void => {
        if (templateThem.title) {
          setThem([...themes, templateThem])
        }
    }, [themes])

    return (
        <div className={styles['forum']}>
            <div className={styles['forum-add-them']}>
                <NesButton 
                    variant='warning'
                    onClick={() => addThem(themes, templateThem)}
                >
                    Append
                </NesButton>
                <NesInput
                    inline
                    label='theme'
                    onChange={(evt) => setTemplateThem({...templateThem, title: evt.target.value})}
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
