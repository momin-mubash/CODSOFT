import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import BlogEditor from './components/BlogEditor';
import Login  from './components/Login';
import SignUp  from './components/SignUp';
import ErrorPage from './components/ErrorPage'; // Import ErrorPage
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="/create" element={<BlogEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/edit/:postId" element={<BlogEditor />} />
        <Route path="/error" element={<ErrorPage />} />

      </Routes>
    </div>
  );
};

export default App;
