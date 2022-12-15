import React, {useId, useState} from 'react'
import styles from './comments.module.scss'
import {RoutePaths} from '@/App'
import {useParams} from 'react-router-dom'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'
import NesTextarea from '@/components/UI/nes-textarea'

export interface CommentsProps {
  author: string,
  content: string,
  date: string,
  id: string,
}

const Comments: React.FC = () => {
  const {title} = useParams()
  const [templateComment, setTemplateComment] = useState({
    author: 'Admin',
    content: '',
    date: new Date().toISOString().split('T')[0],
    id: useId(),
  })

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

const templateRow = (props: CommentsProps) => {
  return (
    <li key={props.id} className={styles['comments-item']}>
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

const addTemplateRow = (comments: Array<CommentsProps>) => comments.map((comment) => templateRow(comment))

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

    <NesTextarea
      label='content to send'
      labelHidden
      onChange={evt => setTemplateComment({...templateComment, content: evt.target.value})}
    ></NesTextarea>
    <NesButton
      type='submit'
      variant='warning'
      onClick={() => addComment(comments, templateComment)}
    >Send</NesButton>
  </div>
  )
}

export default Comments
