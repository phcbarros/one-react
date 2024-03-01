import {Post} from './Post'

import './global.css'

export function App() {
  return (
    <div>
      <Post
        author="Paulo Barros"
        content=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere mollitia exercitationem rem quo ipsa aperiam amet vitae quibusdam illum doloremque quaerat expedita obcaecati ex quas, adipisci quasi, doloribus iste vero."
      />
      <Post
        author="João Pessoa"
        content=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere mollitia exercitationem rem quo ipsa aperiam amet vitae quibusdam illum doloremque quaerat expedita obcaecati ex quas, adipisci quasi, doloribus iste vero."
      />
    </div>
  )
}
