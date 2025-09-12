// src/components/SignUp.jsx
"use client";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';

export default function SignUp() {
  const { signup } = useAuth();
  const router = useRouter();

  async function handleSignUp({ name, email, password }) {
    await signup(name, email, password);
    console.log('Sign up successful');
    router.push('/');
  }

  return (
    <AuthForm
      formTitle="Create your account"
      buttonText="Sign Up"
      onSubmit={handleSignUp}
      includeNameField={true} // Name field is needed for sign up
      switchTo="login"
    />
  );
}
