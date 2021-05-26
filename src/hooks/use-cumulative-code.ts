import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
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
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOP);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) break;
    }
    return cumulativeCode;
  }).join('\n');
};
