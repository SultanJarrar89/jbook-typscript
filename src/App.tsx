import React, { useState, useEffect } from 'react'
import * as esbuild from 'esbuild-wasm'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wsam',
    })
    console.log(service)
  }
  const onclick = () => {
    console.log(input)
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
