import React from 'react';

const SortControls = ({ sortKey, sortOrder, onSortChange }) => {
  const renderArrow = (key) => {
    if (sortKey !== key) return '';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div>
      <label className="me-2 fw-semibold">Sort by:</label>
      <button
        className="btn btn-outline-secondary btn-sm me-2"
        onClick={() => onSortChange('createdAt')}
      >
        Date {renderArrow('createdAt')}
      </button>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => onSortChange('author')}
      >
        Author {renderArrow('author')}
      </button>
    </div>
  );
};

export default SortControls;
