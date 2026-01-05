'use client';

import React, { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import '@/styles/toast.css';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [progress, setProgress] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const timers = toasts.map((toast) => {
      let start = Date.now();
      const duration = 3000;
      const tick = () => {
        const elapsed = Date.now() - start;
        const pct = Math.min((elapsed / duration) * 100, 100);
        setProgress((p) => ({ ...p, [toast.id]: 100 - pct }));
        if (pct < 100) requestAnimationFrame(tick);
      };
      tick();

      const timeout = setTimeout(() => removeToast(toast.id), duration);
      return timeout;
    });

    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
          <div
            className="toast-progress"
            style={{ width: `${progress[toast.id] ?? 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}
