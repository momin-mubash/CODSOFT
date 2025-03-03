import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Login Component
const Login = () => {
  console.log("Login component rendered");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Successful login");
      navigate('/');
    } catch (error) {
      console.error("Login Error:", error.code);

        // Password is incorrect
      if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
        // Invalid email format
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format. Please enter a valid email.");
      } else {
        // User does not exist
          const shouldSignUp = window.confirm(
          "No account found with this email. Would you like to sign up?"
        );
        if (shouldSignUp) {
          navigate('/signup'); // Redirect to Sign-Up page
        }
      
      }
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
