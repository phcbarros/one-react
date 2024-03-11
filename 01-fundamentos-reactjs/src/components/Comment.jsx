import {ThumbsUp, Trash} from 'phosphor-react'

import styles from './Comment.module.css'

export function Comment() {
  return (
    <div className={styles.comment}>
      <img src="https://github.com/phcbarros.png" alt="Foto de Paulo Barros" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Paulo Barros</strong>
              <time title="11 de maio às 08:13h" dateTime="2022-05-11 08:13:00">
                Cerca de 1h atrás
              </time>
            </div>

            <button type="button" title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>Muito bom Devon, parabéns!! 👏👏</p>
        </div>

        <footer>
          <button type="button">
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
