import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../store/slices/commentSlice';

const CommentForm = ({ postId }) => {
  const [commenterName, setCommenterName] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addComment({ postId, comment: { commenterName, content } }));
    setCommenterName('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Your name"
          value={commenterName}
          onChange={(e) => setCommenterName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          className="form-control"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">Comment</button>
    </form>
  );
};

export default CommentForm;
