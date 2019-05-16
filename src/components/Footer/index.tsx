import * as React from 'react';

interface ComponentProps {
  className?: string;
  children?: React.ReactElement;
}

export const Footer: React.SFC<ComponentProps> = ({ children, ...props }) => (
  <footer {...props}>{children}</footer>
);
