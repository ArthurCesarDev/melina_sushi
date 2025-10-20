// src/utils/formatPhoneNumber.ts

/**
 * Formata um número de telefone brasileiro no padrão (11) 98765-4321
 * @param value string contendo apenas dígitos
 */
export function formatPhoneNumber(value: string): string {
  // Evita replaceAll (bug com regex + Sonar)
  const digits = Array.from(value).filter((c) => /\d/.test(c)).join('').slice(0, 11);

  if (!digits) return '';

  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
