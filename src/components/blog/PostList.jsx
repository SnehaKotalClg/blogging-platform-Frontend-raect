import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/slices/blogSlice';
import { Link } from 'react-router-dom';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.blog);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  console.log('Posts:', posts);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Blog Posts</h2>
        <Link to="/create" className="btn btn-primary btn-sm">
          Create New Blog
        </Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.author || 'Unknown'}</td>
              <td>
                <Link to={`/post/${post._id}`} className="btn btn-sm btn-outline-primary">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
