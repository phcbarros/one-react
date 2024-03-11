import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import {Avatar} from './Avatar'
import {Comment} from './Comment'

import styles from './Post.module.css'

export function Post({author, content, publishedAt: date}) {
  const formattedDate = format(date, 'd MMM yyyy, HH:mm', {locale: ptBR})
  const relativeDate = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            imageSrc={author.avatarUrl}
            imageAlt={`Foto de ${author.name}`}
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time dateTime={date.toISOString()} title={formattedDate}>
          {relativeDate}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(({type, content: text}) =>
          type === 'paragraph' ? (
            <p key={text}>{text}</p>
          ) : type === 'link' ? (
            <p key={text}>
              <a href="#">{text}</a>
            </p>
          ) : null,
        )}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea placeholder="Deixe um comentário" />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}
