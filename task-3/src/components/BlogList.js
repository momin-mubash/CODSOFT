import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { firestore, auth } from '../firebase'; // Ensure both Firestore and Auth are imported
import '../index.css';
import '../App.css';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('BlogList component rendered');
    
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'posts'));
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    const user = auth.currentUser; // Get the currently logged-in user

    if (post.authorId === auth.currentUser?.uid) {
      navigate(`/edit/${post.id}`); // Redirect to BlogEditor
    } else {
      alert("Sorry! You can't edit blogs owned by others."); // Alert if not the owner
    }
  };

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="blog-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
          <button onClick={() => handleEdit(post)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
