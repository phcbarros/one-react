import {Avatar} from './Avatar'
import {Comment} from './Comment'

import styles from './Post.module.css'

export function Post({author, content, publishedAt}) {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            imageSrc={author.avatarUrl}
            imageAlt={`Foto de ${author.name}`}
          />
          <div className={styles.authorInfo}>
            <strong>Paulo Barros</strong>
            <span>Web Developer</span>
          </div>
        </div>
        <time dateTime={publishedAt} title="11 de maio às 08:13h">
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>
          Acabei de subir mais um projeto no meu portifa. É um projeto que fiz
          no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀
        </p>
        <p>
          <a href="#">jane.design/doctorcare</a>
        </p>
        <p>
          <a href="#">#novoprojeto</a>
          <a href="#">#nlw</a>
          <a href="#">#rocketseat</a>
        </p>
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
