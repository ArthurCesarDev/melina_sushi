// resetar-senha/page.tsx

'use client';
import { ResetPasswordForm } from '@/components/ResetPasswordForm';
import { ResetContainer } from '@/styles/Styles';

export default function ResetPasswordPage() {
  return (
    <ResetContainer>
      <ResetPasswordForm />
    </ResetContainer>
  );
}
