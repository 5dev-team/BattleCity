import React, {useState} from 'react';
import styles from './forum.module.scss';
import NesButton from '@/components/UI/nes-button';
import NesInput from '@/components/UI/nes-input';

export type ForumThemesType = {
    title: string,
    author: string,
    answers: number,
    lastAnswer: string,
};

const Forum: React.FC = () => {
    const [templateThem, setTemplateThem] = useState({
        title: '',
        author: 'Admin',
        answers: 0,
        lastAnswer: new Date().toISOString().split('T')[0],
    });

    const [themes, setThem] = useState([
        {
            title: 'WorldOfTank',
            author: 'Admin',
            answers: 27,
            lastAnswer: '12.12.2022',
        },
        {
            title: 'TankOfWorld',
            author: 'Domin',
            answers: 9,
            lastAnswer: '12.12.2022',
        },
        {
            title: 'WorldOfWorld',
            author: 'Mindon',
            answers: 11,
            lastAnswer: '12.12.2022',
        }
    ]);

    const titles = ['Тема', 'Автор', 'Ответы', 'Последний']
        .map((el, id) => <div key={id} className={`${styles['forum-header-item']}`}>{el}</div>);

    const addThemes = (themes: Array<ForumThemesType>) => {
        return themes
            .map((theme, id) => <div key={id} className={`${styles['forum-theme']}`}>{Object.values(theme)
                .map((el, id) => <div key={id} className={`${styles['forum-theme-item']}`}>{el}</div>)}</div>);
    };

    const addThem = (themes: Array<ForumThemesType>, templateThem: ForumThemesType): void => {
        templateThem.title && setThem([...themes, templateThem]);
    };

    return (
        <div className={`${styles['forum']}`}>
            <div className={`${styles['forum-add-them']}`}>
                <NesButton 
                    variant='warning'
                    onClick={() => addThem(themes, templateThem)}
                >
                    Добавить
                </NesButton>
                <NesInput
                    inline
                    label='Название темы'
                    onChange={evt => setTemplateThem({...templateThem, title: evt.target.value})}
                />
            </div>
            <div className={`${styles['forum-header']}`}>{titles}</div>
            <div className={`${styles['forum-themes']}`}>{addThemes(themes)}</div>
        </div>
    );
}

export default Forum;
