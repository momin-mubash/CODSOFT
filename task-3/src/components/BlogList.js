import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase'; // Ensure firestore is properly imported and initialized
import '../index.css';
import '../App.css';

function BlogList() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="blog-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
          <Link to={`/edit/${post.id}`}>Edit</Link> {/* Link to edit page */}
        </div>
      ))}
    </div>
  );
}

export default BlogList;
