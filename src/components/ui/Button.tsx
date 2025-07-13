// Create a button component with Tailwind CSS and TypeScript
import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'medium', 
  className, 
  children, 
  ...props 
}) => {
  const baseStyles = 'rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    tertiary: 'bg-transparent text-blue-500 hover:bg-blue-100',
  };
  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={twMerge(`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`)}
      {...props}
    >
      {children}
    </button>
  );
};


export default Button;

// Cách sử dụng component Button
// import Button from './Button';
// 
// function App() {
//   return (
//     <div className="App">
//       <Button variant="primary" size="medium">Primary Button</Button>
//       <Button variant="secondary" size="large">Secondary Button</Button>
//       <Button variant="tertiary" size="small">Tertiary Button</Button>
//     </div>
//   );
// }
// export default App;