import React from 'react';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import { Cell } from '../redux';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  cell.type === 'code'
    ? (child = <CodeCell cell={cell} />)
    : (child = <TextEditor cell={cell} />);
  return <div>{child}</div>;
};

export default CellListItem;
