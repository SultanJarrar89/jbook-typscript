import React, { useState, useEffect, useRef } from 'react'
import * as esbuild from 'esbuild-wasm'

const App = () => {
  const ref = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wsam',
    })
  }
  const onclick = () => {
    if (!ref.current) return
    console.log(ref.current)
  }

  useEffect(() => {
    startService()
  }, [])

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onclick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

export default App
