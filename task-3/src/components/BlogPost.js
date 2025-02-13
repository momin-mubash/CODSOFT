import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log('BlogPost component rendered');
    const fetchPost = async () => {
      const docRef = doc(firestore, 'posts', id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const postData = { id: docSnap.id, ...docSnap.data() };
        console.log("Fetched post data:", postData); // Debugging
        setPost(postData);
      } else {
        console.log('No such document!');
      }
    };
    fetchPost();
  }, [id]);
  

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>Author: {post.author || "Unknown"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogPost;
