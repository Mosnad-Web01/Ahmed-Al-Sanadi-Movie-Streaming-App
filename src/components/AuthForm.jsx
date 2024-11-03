// src/components/AuthForm.jsx
"use client";
import { showErrorToast, showSuccessToast } from '@/util/toast';
import Link from 'next/link';
import { useState } from 'react';

export default function AuthForm({ formTitle, buttonText, onSubmit, includeNameField , switchTo ="login"}) {
  const [name, setName] = useState(''); // For sign up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await onSubmit({ name, email, password });
      showSuccessToast('Logged in successfully');
    } catch (err) {
      setError('Failed to submit the form');
      showErrorToast('Failed to submit the form', err);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gradient-to-br dark:from-[#121127] dark:via-[#044a64] dark:to-[#018c9e]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">{formTitle}</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {includeNameField && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
          >
            {buttonText}
          </button>

          <div className='text-center text-gray-500  '>
            {switchTo === "login" ?(
              <p>
                Already have an account ?{' '}
                <Link
                  href="/sign-in"
                  className="text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Login
                </Link>
              </p>
            ):(
              <p className='text-center'>
                Dont have an account ? {' '}
                <Link
                  href="/sign-up"
                  className="text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Sign Up
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
