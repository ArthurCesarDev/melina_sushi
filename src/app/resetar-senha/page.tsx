// resetar-senha/page.tsx

'use client';
import { ResetPasswordForm } from '@/features/auth/presentation/ResetPasswordForm';
import { ResetContainer } from '@/styles/Styles';

export default function ResetPasswordPage() {
  return (
    <ResetContainer>
      <ResetPasswordForm />
    </ResetContainer>
  );
}
