import {PencilLine} from 'phosphor-react'
import {Avatar} from './Avatar'

import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=500&q=50&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="imagem de uma tela de computador com código"
      />

      <div className={styles.profile}>
        <Avatar
          src="https://github.com/phcbarros.png"
          alt="foto de Paulo Barros"
        />
        <strong>Paulo Barros</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#" role="button">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}
