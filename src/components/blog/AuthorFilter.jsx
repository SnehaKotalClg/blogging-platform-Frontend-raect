import React from 'react';

const AuthorFilter = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Filter by author..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default AuthorFilter;
