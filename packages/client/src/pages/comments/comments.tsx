import React, {useId, useState} from 'react'
import styles from './comments.module.scss'
import {RoutePaths} from '@/App'
import {useParams} from 'react-router-dom'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'
import InputEmoji from '@/components/UI/input-emoji/input-emoji'

export interface CommentsProps {
  author: string,
  content: string,
  date: string,
  id: string,
}

const Comments: React.FC = () => {
  const {title} = useParams()
  const [text, setText] = useState('')

  const templateComment = {
    author: 'Admin',
    content: text,
    date: new Date().toISOString().split('T')[0],
    id: useId(),
  }

  const [comments, setComment] = useState([
    {
        author: 'Admin',
        content: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века.',
        date: '02-09-2021',
        id: useId(),
    },
    {
        author: 'Domin',
        content: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века.',
        date: '12-12-2022',
        id: useId(),
    },
])

const templateRow = (props: CommentsProps, id: string) => {
  return (
    <li key={id} className={`${styles['comments-item']} comments-item`} data-id={props.id}>
      <div className={styles['comments-info']}>{props.author}</div>
      <div className={styles['comments-content']}>
        <span className={`${styles['comments-content-date']} nes-text is-disabled`}>{props.date}</span>
          {props.content}
      </div>
    </li>
  )
}

const addComment = (comments: Array<CommentsProps>, templateThem: CommentsProps): void => {
  if (templateThem.content) {
    setComment([...comments, templateComment])
  }
}

const addTemplateRow = (comments: Array<CommentsProps>) => comments.map((comment, id) => templateRow(comment, id.toString()))
  return (
  <div className={styles['comments']}>
    <NesLink to={RoutePaths.FORUM}>Back</NesLink>
    <h2 className={styles['comments-title']}>{title}</h2>
    <div className={styles['comments-header']}>
      <div className={styles['comments-header-info']}>info</div>
      <div className={styles['comments-header-content']}>Content</div>
    </div>
    <ul className={styles['comments-list']}>
      {addTemplateRow(comments)}
    </ul>
    <InputEmoji
      value={text}
      borderRadius = {0}
      onChange={setText}
      cleanOnEnter
      placeholder='Type a message'
      onEnter={() => addComment(comments, templateComment)}
    />
    <NesButton
      type='submit'
      variant='warning'
      onClick={(evt) => {
        return new Promise(resolve => resolve(evt))
          .then(() => addComment(comments, templateComment))
          .then(() => setText(''))
          .then(() => (evt.target as Element).scrollIntoView(false))
      }}
    >
      Send
    </NesButton>
  </div>
  )
}

export default Comments
