import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, deletePost } from '../../store/slices/blogSlice';
import { fetchComments } from '../../store/slices/commentSlice';
import { useNavigate, useParams } from 'react-router-dom'; 
import CommentForm from '../comments/CommentForm';

const PostDetail = () => {
  const { id: postId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPost } = useSelector((state) => state.blog);
  const { commentsByPost } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      await dispatch(deletePost(postId));
      navigate('/');
    }
  };

  if (!currentPost) return <p>Loading...</p>;

  const comments = commentsByPost[postId] || [];

  return (
    <div>
      <h2>{currentPost.title}</h2>
      <p className="text-muted">by {currentPost.author}</p>
      <p>{currentPost.content}</p>

      {user?.id === currentPost.authorId && (
        <>
          <button onClick={() => navigate(`/edit/${postId}`)} className="btn btn-warning btn-sm me-2">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger btn-sm">
            Delete
          </button>
        </>
      )}

      <hr />
      <h5>Comments</h5>
      {comments.map((comment, idx) => (
        <div key={idx} className="border p-2 mb-2">
          <strong>{comment.commenterName}</strong>
          <p>{comment.content}</p>
        </div>
      ))}
      <CommentForm postId={postId} />
    </div>
  );
};

export default PostDetail;
