import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './AddCell';
import CellListItem from './CellListItem';
const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <>
      <AddCell nextCellId={cell.id} />
      <CellListItem key={cell.id} cell={cell} />
    </>
  ));
  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  );
};

export default CellList;
