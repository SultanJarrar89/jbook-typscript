import React, { useState, useEffect, useRef } from 'react'
import * as esbuild from 'esbuild-wasm'

const App = () => {
  const ref = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })
  }
  const onclick = async () => {
    if (!ref.current) return

    const results = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    })

    console.log(results)

    setCode(results.code)
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
