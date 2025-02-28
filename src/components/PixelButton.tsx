
import React from 'react';
import { cn } from "@/lib/utils";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold';
  children: React.ReactNode;
}

const PixelButton = ({ 
  variant = 'primary', 
  className, 
  children, 
  ...props 
}: PixelButtonProps) => {
  const buttonClass = {
    'primary': 'minecraft-btn',
    'secondary': 'minecraft-btn-secondary',
    'gold': 'minecraft-btn-gold',
  }[variant];
  
  return (
    <button 
      className={cn(buttonClass, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;
