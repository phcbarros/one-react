import {getCssText} from '@/styles'
import {Head, Html, Main, NextScript} from 'next/document'

/**
 * Estrutura global da aplicação (não temos acesso direto ao arquivo index.html)
 * Tudo é componente no Next inclusive o HTML como um todo
 * Usado para código global, manter o mais simples possível
 * Sempre que alterar precisa iniciar o servidor de Dev do Next
 * */
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style id="stitches" dangerouslySetInnerHTML={{__html: getCssText()}} />
      </Head>
      <body>
        {/* Onde o html será injetado */}
        <Main />
        {/* Onde o script do next será injetado */}
        <NextScript />
      </body>
    </Html>
  )
}
