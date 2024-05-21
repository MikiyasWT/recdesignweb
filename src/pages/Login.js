import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { loginApi} from "../services/auth";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginApi({
        username,
        password,
      });
      const data = response.data;
      const success = data.success;
      if (response.status === 200) {
        const token = response.data.token;
        const cookies = new Cookies();
        cookies.set('authCookies', token, { path: '/' });
        navigate('/data');
      }
      else {
        // Handle login error
        setError(response.data.message);
      }
    } catch (error) {
      setError('Invalid credentials, Please try again.');

    }finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="email">username</label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <a href="/signup" className='text-sm text-blue-400 flex justify-end'>Don't have an account SignUp here</a>
        </form>
      </div>
    </div>
  );
};

export default Login;