import React from 'react';

interface InnerContentProps {
  children: React.ReactNode;
  extra?: string; // Make extra optional
  [key: string]: any; // Allow for additional props
}

export default function InnerContent({ children, extra = '', ...rest }: InnerContentProps) {
  return (
    <div
      className={`items-center mx-auto flex flex-col xl:max-w-[1170px] ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}