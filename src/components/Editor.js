import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/neat.css'
import 'codemirror/theme/moxer.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import minimize from "../icons/minimize.svg";
import maximize from "../icons/maximize.svg";

let toggle = 1;
export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange
  } = props
  const [open, setOpen] = useState(true)

  function handleChange(editor, data, value) {
    onChange(value)
  }
  const fold = () => {
    toggle = !toggle;
    console.log(toggle)
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={fold}
        >
          <img src={toggle ? minimize : maximize} alt='icon' />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'moxer',
          lineNumbers: true
        }}
      />
    </div>
  )
}
