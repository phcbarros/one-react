import {format, formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {Avatar} from './Avatar'
import {Comment} from './Comment'
import {
  type FormEvent,
  useState,
  type ChangeEvent,
  type InvalidEvent,
} from 'react'

import styles from './Post.module.css'

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

export interface PostType {
  id: number
  author: Author
  publishedAt: Date
  content: Content[]
}

interface PostProps {
  post: PostType
}

export function Post({post}: Readonly<PostProps>) {
  const [comments, setComments] = useState(['Muito bom, hein!'])
  const [newCommentText, setNewCommentText] = useState('')

  const formattedDate = format(post.publishedAt, 'd MMM yyyy, HH:mm', {
    locale: ptBR,
  })
  const relativeDate = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {
    const filteredComments = comments.filter((commentItem) => {
      return commentItem !== commentToDelete
    })
    setComments(filteredComments)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={post.author.avatarUrl}
            alt={`Foto de ${post.author.name}`}
          />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time dateTime={post.publishedAt.toISOString()} title={formattedDate}>
          {relativeDate}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(({type, content: text}) =>
          type === 'paragraph' ? (
            <p key={text}>{text}</p>
          ) : type === 'link' ? (
            <p key={text}>
              <a href="#">{text}</a>
            </p>
          ) : null,
        )}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          required
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  )
}
