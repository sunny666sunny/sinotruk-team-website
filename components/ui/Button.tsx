import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'quiet';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className = '', type = 'button', variant = 'primary', ...props },
  ref,
) {
  return <button ref={ref} type={type} className={`ui-button ui-button--${variant} ${className}`.trim()} {...props} />;
});
