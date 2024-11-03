// src/components/Login.jsx
"use client";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  async function handleLogin({ email, password }) {
    await login(email, password);
    console.log('Login successful');
    router.push('/');
  }

  return (
    <AuthForm
      formTitle="Login to your account"
      buttonText="Log In"
      onSubmit={handleLogin}
      includeNameField={false} 
       switchTo="SignUp"
    />
  );
}
