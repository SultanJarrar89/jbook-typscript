import React from 'react';
import { useActions } from '../hooks/use-actions';
import './AddCell.css';

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className='add-cell'>
      <div className='add-button'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => insertCellBefore(nextCellId, 'code')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => insertCellBefore(nextCellId, 'text')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider' />
    </div>
  );
};

export default AddCell;
