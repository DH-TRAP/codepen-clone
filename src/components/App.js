import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import penWhite from "../icons/pen-white.svg";
import penBlack from "../icons/pen-black.svg";
import resetWhite from "../icons/reset-white.svg";
import resetBlack from "../icons/reset-black.svg";
import layoutWhite from "../icons/layout-white.svg";
import layoutBlack from "../icons/layout-black.svg";
import sun from "../icons/sun.svg";
import moon from "../icons/moon.svg";

let layout, mode;

function App() {
  // Declaring states to store user's code in local storage.
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  // Combining html, css and js in one state after a delay.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <header>
        <div className='menu-bar'>
          <h2> Untitled <img className='pencil' src={penWhite} /></h2>
          <div>
            <button type='submit'><img className='reset' src={resetWhite} /></button>
            <button ><img className='layout' src={layoutWhite} /></button>
            <button><img className='mode' src={sun} /></button>
          </div>
        </div>
        <p>short description</p>
      </header>
      <div className="editors pane">
        <Editor
          displayName="HTML"
          language="xml"
          value={html}
          onChange={setHtml}
        />
        <Editor
          displayName="CSS"
          language="css"
          value={css}
          onChange={setCss}
        />
        <Editor
          displayName="JS"
          language="javascript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="output pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
