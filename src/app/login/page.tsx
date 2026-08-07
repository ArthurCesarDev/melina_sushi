// src/app/login/page.tsx

'use client';
import { LoginForm } from '@/features/auth/presentation/AdminLoginForm';
import { LoginContainer } from '@/styles/Styles';

export default function LoginPage() {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
}
