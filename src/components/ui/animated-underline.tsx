"use client";

import React from 'react';

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
}
 
export const AnimatedUnderline = ({ children, className = "" }: AnimatedUnderlineProps) => {
  return (
    <div className={`relative after:absolute after:bg-white after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 ${className}`}>
      {children}
    </div>
  );
}