import React, {useState} from 'react'
import styles from './comments.module.scss'
import {RoutePaths} from '@/router'
import {useParams} from 'react-router-dom'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'
import NesTextarea from '@/components/UI/nes-textarea'
import SmilesBlock from '@/components/UI/smiles-block'

export interface ICommentsProps {
  author: string,
  content: string,
  date: string,
}

const Comments: React.FC = () => {
  const {title} = useParams()
  const [templateComment, setTemplateComment] = useState({
    author: 'Admin',
    content: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [comments, setComment] = useState([
    {
        author: 'Admin',
        content: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века.',
        date: '2021-09-02',
    },
    {
        author: 'Domin',
        content: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века.',
        date: '2022-08-07',
    },
  ])

  const templateRow = (props: ICommentsProps, id: number) => {
    return (
      <li key={id} className={`${styles['comments-item']}`}>
        <div className={styles['comments-info']}>{props.author}</div>
        <div className={styles['comments-content']}>
          <span className={`${styles['comments-content-date']} nes-text is-disabled`}>{props.date}</span>
          <span
            className={styles['comments-content-re']}
            onClick={() => {
              const re = `<div class=comments-content-inner contentEditable="false">Re:${props.author}<br>
                  ${props.content}
                </div><br>`
              setTemplateComment({...templateComment, content: templateComment.content + re})
            }}
          >Re:</span>
          <div dangerouslySetInnerHTML={{__html: props.content}} />
        </div>
      </li>
    )
  }

  const addComment = (comments: Array<ICommentsProps>, templateThem: ICommentsProps): void => {
    templateThem.content && setComment([...comments, templateComment])
  }

  const placeCursor = (target: HTMLElement) => {
    const [range, select] = [document.createRange(), window.getSelection()]
              
    if (!range || !select) {return}

    range.selectNodeContents(target)
    range.collapse(false)
    select.removeAllRanges()
    select.addRange(range)
  }

  const addTemplateRow = (comments: Array<ICommentsProps>) => comments.map((comment, id) => templateRow(comment, id))
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
          value={templateComment.content}
          //@ts-ignore
          onInput={(evt: Event) => {
            Promise.resolve(evt)
              .then(() => setTemplateComment({...templateComment, content: (evt.target as Element).innerHTML}))
              .then(() => placeCursor(evt.target as HTMLElement))
          }}
        ></NesTextarea>
        <SmilesBlock
          //@ts-ignore
          onClick = {(evt: Event) => {
            if ((evt.target as HTMLImageElement).src) {
              const img = (evt.target as Element).outerHTML
              const content = templateComment.content + img

              setTemplateComment({...templateComment, content: content})
            }
          }}
        ></SmilesBlock>
        <NesButton
          type='submit'
          variant='warning'
          onClick={(evt) => {
            return new Promise(resolve => resolve(evt))
              .then(() => addComment(comments, templateComment))
              .then(() => setTemplateComment({...templateComment, content: ''}))
              .then(() => (evt.target as Element).scrollIntoView(false))
          }}
        >Send</NesButton>
      </div>
    )
}

export default Comments
