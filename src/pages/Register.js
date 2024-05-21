import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../services/auth';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        roles: ['Manager'], // guest is  the default user
      });
    
      const handleChange = (event) => {
        const allowedChars = /^[0-9\b-]+$/;
        if (allowedChars.test(event.target.value)) {
          setFormData({ ...formData, [event.target.name]: event.target.value });
        }
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();

    
        try {
            
          const response = await registerApi({...formData,roles: ['Guest'],})

            if(response.status >= 200 && response.status < 300)
                {
                    console.log('User registered successfully:', response.data);
                    navigate('/login');
                  }
            else {throw new Error('Failed to register user: ' + response.data.message);}
          } catch (error) {
          console.error('Error registering user:', error);
          // Handle registration errors (e.g., display error message to user)
        }
      };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form>
        <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your first name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your last name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="phoneNumber">
              Phone Number (Optional)
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
          <a href="/login" className='text-sm text-blue-400 flex justify-end'>Already have an account login here</a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
