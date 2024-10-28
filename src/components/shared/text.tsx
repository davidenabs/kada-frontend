import React, { ElementType, FC } from 'react';

interface TextProps {
  as?: ElementType; // This prop allows you to define the HTML tag (e.g., h1, h2)
  className?: string; // Allows additional custom class names to be passed
  children: React.ReactNode; // Ensures that content can be passed inside the component
}

const Text: FC<TextProps> = ({ as: Component = 'h1', className = '', children }) => {
  return (
    <Component className={`text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl ${className}`}>
      {children}
    </Component>
  );
};

export default Text;
