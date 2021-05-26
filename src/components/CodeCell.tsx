import React, { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

import Resizable from './Resizable';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

import './CodeCell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { order, data } = state.cells;
    const orederCells = order.map((id) => data[id]);
    const showFunc = ` 
        import _React from 'react'
        import _ReactDOM from 'react-dom'
        var show = (value) => {
          const root = document.querySelector('#root')
          if(typeof value === 'object'){
            if(value.$$typeof && value.props){
              _ReactDOM.render(value,root)
            }else{
              root.innerHTML= JSON.stringify(value)
            }
          }else{
            root.innerHTML= value
          }
        };
      `;
    const showFuncNoOP = 'var show = () => {}';
    const cumulativeCode = [];
    for (const c of orederCells) {
      if (c.type === 'code') {
        if (cell.id === c.id) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOP);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) break;
    }
    return cumulativeCode;
  });
  const { updateCell, createBundle } = useActions();

  console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join('\n'), createBundle]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
