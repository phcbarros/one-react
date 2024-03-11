import {Post} from './components/Post'
import {Header} from './components/Header'
import {Sidebar} from './components/Sidebar'

import styles from './App.module.css'

import './global.css'

const posts = [
  {
    id: 1,
    author: {
      name: 'Paulo Barros',
      avatarUrl: 'https://github.com/phcbarros.png',
      role: 'Developer',
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2024-04-10 20:00:00'),
  },
  {
    author: {
      name: 'Diego Fernandes',
      avatarUrl: 'https://github.com/diego3g.png',
      role: 'CEO at Rockeatseat',
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {
        type: 'paragraph',
        content:
          'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2024-04-11 20:00:00'),
  },
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
