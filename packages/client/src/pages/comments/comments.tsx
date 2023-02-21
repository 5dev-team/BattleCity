import React, { useEffect, useState, useRef } from 'react'
import styles from './comments.module.scss'
import { RoutePaths } from '@/router'
import { useParams, useNavigate } from 'react-router-dom'
import NesLink from '@/components/UI/nes-link'
import NesButton from '@/components/UI/nes-button'
import NesTextarea from '@/components/UI/nes-textarea'
import SmilesBlock from '@/components/UI/smiles-block'
import api from '@/api'
import { IForumPost } from '@/api/forum/forum.models'

interface IMessage {
  root: number | null
  content: string
}

const Comments: React.FC = () => {
  const { forumId } = useParams<{ forumId: string }>()
  const messagesBox = useRef<HTMLDivElement>(null)

  const nav = useNavigate()

  useEffect(() => {
    if (!Number(forumId)) {
      nav('/forum')
    } else {
      api.forum
        .getForumPosts(Number(forumId))
        .then(res => setForumPosts(res.data))
    }
  }, [])

  const [forumPosts, setForumPosts] = useState<IForumPost[]>([])

  useEffect(() => {
    if (messagesBox.current) {
      messagesBox.current.scrollTo(0, messagesBox.current.scrollHeight)
    }
  }, [forumPosts])

  const [message, setMessage] = useState<IMessage>({ root: null, content: '' })

  const onInputMessage = (el: HTMLElement) => {
    // async hack
    Promise.resolve()
      .then(() => setMessage({ ...message, content: el.innerHTML }))
      .then(() => placeCaret(el))
  }

  const placeCaret = (el: HTMLElement) => {
    const range = document.createRange()
    const select = window.getSelection()

    if (!range || !select) {
      return
    }

    range.selectNodeContents(el)
    range.collapse(false)
    select.removeAllRanges()
    select.addRange(range)
  }

  const onReClick = (re: IForumPost) => {
    setMessage({ ...message, root: re.id })
  }

  const onSendClick = () => {
    if (message.content) {
      api.forum
        .createForumPost({
          forumId: Number(forumId),
          content: message.content,
          rootPost: message.root,
        })
        .then(res => {
          setForumPosts([...forumPosts, res.data])
          setMessage({ root: null, content: '' })
        })
    }
  }

  return (
    <div className={styles['comments-wrapper']}>
      <NesLink to={RoutePaths.FORUM}>Back</NesLink>
      <div className={styles['chat']}>
        <div className={styles['chat__header']}>
          <div
            className={`${styles['chat__header__author']} ${styles['table-text']}`}>
            Author
          </div>
          <div
            className={`${styles['chat__header__content']} ${styles['table-text']}`}>
            Content
          </div>
        </div>
        <div className={styles['chat__messages']} ref={messagesBox}>
          {forumPosts.map(forumPost => (
            <div key={forumPost.id} className={styles['message']}>
              <div
                className={`${styles['message__author']} ${styles['table-text']}`}>
                {forumPost.authorName}
              </div>
              <div
                className={`${styles['message__content']} ${styles['table-text']}`}
                dangerouslySetInnerHTML={{
                  __html: `${
                    forumPost.rootPost
                      ? `<div class='${styles['re__content']}'>Re: ${
                          forumPosts.find(el => el.id === forumPost.rootPost)
                            ?.content
                        }</div>`
                      : ''
                  } ${forumPost.content}`,
                }}
              />
              <div className={styles['message__date']}>
                {new Date(forumPost.createdAt).toLocaleString()}
              </div>
              <NesButton
                className={styles['message__re']}
                onClick={() => onReClick(forumPost)}
                variant={message.root === forumPost.id ? 'primary' : undefined}>
                Re:
              </NesButton>
            </div>
          ))}
        </div>
      </div>
      <SmilesBlock
        onImg={node =>
          setMessage({ ...message, content: message.content + node.outerHTML })
        }
      />
      <div className={styles['send-message']}>
        <NesTextarea
          value={message.content}
          className={styles['send-message__textarea']}
          onInput={e => onInputMessage(e.target as HTMLElement)}
        />
        <NesButton variant='primary' onClick={() => onSendClick()}>
          Send
        </NesButton>
      </div>
    </div>
  )
}

export default Comments
