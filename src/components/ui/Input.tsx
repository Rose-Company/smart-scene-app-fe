import React from "react";
import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  inputSize?: 'small' | 'medium' | 'large';
}

const Input: React.FC<InputProps> = ({ 
  variant = 'primary', 
  inputSize = 'medium', 
  className, 
  ...props 
}) => {
  const baseStyles = 'rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
    secondary: 'border border-gray-400 text-gray-800 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500',
    tertiary: 'border border-transparent text-gray-700 placeholder-gray-300 focus:border-blue-200 focus:ring-blue-200',
  };
  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <input
      className={twMerge(`${baseStyles} ${variantStyles[variant]} ${sizeStyles[inputSize]} ${className}`)}
      {...props}
    />
  );
};

export default Input;