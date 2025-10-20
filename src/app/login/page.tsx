// src/app/login/page.tsx

'use client';
import { LoginForm } from './LoginForm';
import { LoginContainer } from './styles';

export default function LoginPage() {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
}
