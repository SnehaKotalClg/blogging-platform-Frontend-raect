import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostList from './components/blog/PostList';
import CreatePost from './components/blog/CreatePost';
import EditPost from './components/blog/EditPost';
import PostDetail from './components/blog/PostDetail';
import CommentForm from './components/comments/CommentForm';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Navbar from './components/shared/Navbar';

const App = () => {
  return (
    <>
    <Navbar/>
    <div className="container mt-4">
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PostList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comment/:id"
          element={
            <ProtectedRoute>
              <CommentForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <footer className="mt-5">
        <p className="text-center">© 2025 My Blog</p>
      </footer>
    </div>
    </>
  );
};

export default App;
