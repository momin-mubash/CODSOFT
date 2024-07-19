import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Ensure firestore is properly imported and initialized

const BlogEditor = () => {
  const { id: postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('BlogEditor component rendered');
    if (postId) {
      const fetchPost = async () => {
        const postRef = doc(firestore, 'posts', postId);
        const postSnapshot = await getDoc(postRef);
        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          setTitle(postData.title);
          setContent(postData.content);
          setAuthor(postData.author);
        } else {
          // Handle post not found or redirect to error page
          navigate('/404'); // Example: Redirect to a 404 page if post not found
        }
      };

      fetchPost();
    }
  }, [postId, navigate]);

  const handleSave = async () => {
    const postRef = doc(firestore, 'posts', postId || `${Date.now()}`);
    const postData = { title, content, author };

    try {
      if (postId) {
        await updateDoc(postRef, postData);
      } else {
        await setDoc(postRef, postData);
      }
      navigate('/'); // Redirect to home page after save
    } catch (error) {
      console.error('Error saving post: ', error);
      // Handle error saving post (e.g., show error message to user)
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const postRef = doc(firestore, 'posts', postId);
        await deleteDoc(postRef);
        navigate('/'); // Redirect to home page after delete
      } catch (error) {
        console.error('Error deleting post: ', error);
        // Handle error deleting post (e.g., show error message to user)
      }
    }
  };

  return (
    <div className="editor-container">
      <h2>{postId ? 'Edit Post' : 'Create Post'}</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Author" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
        disabled={!!postId} 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      />
      <div className="button-container">
        <button onClick={handleSave}>
          {postId ? 'Save Changes' : 'Publish'}
        </button>
        {postId && (
          <button 
            onClick={handleDelete} 
            style={{ backgroundColor: '#dc3545', marginLeft: '10px' }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default BlogEditor;
