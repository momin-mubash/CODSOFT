import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc,updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase'; 

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author,setAuthor] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) return; // Exit if there's no postId (means creating a new post)
  
    const fetchPost = async () => {
        try {
          const postRef = doc(db, 'posts', postId);
          const postDoc = await getDoc(postRef);
          
          if (postDoc.exists()) {
            const post = postDoc.data();
           
            if (post.authorId === auth.currentUser?.uid) {
              setTitle(post.title);
              setContent(post.content);
            } else {
              alert("❌ Sorry! You can't edit blogs owned by others.");
            navigate('/error');
            }
          } else {
            navigate('/404'); // If post doesn't exist, redirect to 404
          }
        } catch (error) {
          console.error("Error fetching post: ", error);
          navigate('/error');
        }
      }; 

    fetchPost();
  }, [postId, navigate]);




  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!author) {
      alert("Please enter an author name.");
      return;
  }

    try {
      const postRef = doc(db, 'posts', postId || new Date().toISOString()); // Reference for Firestore
      
      const postData = {
       title,
       content, 
       updatedAt: new Date().toISOString(),
      };

    if (postId) {
        // Update existing post, but do NOT overwrite author details
        await updateDoc(postRef, postData);
    } else {
        // Create new post with author name and ID
        await setDoc(postRef, { ...postData, author: author, authorId: user.uid });
    }
    
    console.log("Post saved successfully:", postData);  
      navigate('/');
    } catch (error) {
      console.error("Error saving post: ", error);
    }
  };


  return (
    <div>
      <h1>{postId ? 'Edit Post' : 'Create Post'}</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name" />


      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default BlogEditor;
