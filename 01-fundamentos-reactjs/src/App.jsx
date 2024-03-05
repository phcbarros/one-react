import {Post} from './Post'
import {Header} from './components/Header'
import {Sidebar} from './components/Sidebar'

import styles from './App.module.css'

import './global.css'

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author="Paulo Barros"
            content=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere mollitia exercitationem rem quo ipsa aperiam amet vitae quibusdam illum doloremque quaerat expedita obcaecati ex quas, adipisci quasi, doloribus iste vero."
          />
          <Post
            author="João Pessoa"
            content=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere mollitia exercitationem rem quo ipsa aperiam amet vitae quibusdam illum doloremque quaerat expedita obcaecati ex quas, adipisci quasi, doloribus iste vero."
          />
        </main>
      </div>
    </div>
  )
}
