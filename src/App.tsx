import React, { useState, useEffect, useRef } from 'react';
import CodeEditor from './components/CodeEditor';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpakg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import Preview from './components/Preview';

const App = () => {
  const ref = useRef<any>();
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };
  const onclick = async () => {
    if (!ref.current) return;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    setCode(result.outputFiles[0].text);
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <CodeEditor
        initialValue='const a = 2'
        onChange={(value) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onclick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default App;
