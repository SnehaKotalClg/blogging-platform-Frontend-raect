import React from 'react';
import { useParams } from 'react-router-dom';
import EditPost from '../components/blog/EditPost';

const EditPostPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Edit Post</h2>
      <EditPost postId={parseInt(id)} />
    </div>
  );
};

export default EditPostPage;
