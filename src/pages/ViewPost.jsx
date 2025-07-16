import React from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../components/blog/PostDetail';

const ViewPost = () => {
  const { id } = useParams();

  return (
    <div>
      <PostDetail postId={parseInt(id)} />
    </div>
  );
};

export default ViewPost;
