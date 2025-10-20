// src/app/login/page.tsx

'use client';
import { LoginForm } from './components/LoginForm';
import { LoginContainer } from './components/styles';

export default function LoginPage() {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
}
