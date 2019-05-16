import * as React from 'react';

interface ComponentProps {
    title?: string;
    children?: React.ReactElement;
    className?: string;
}

export const Header: React.SFC<ComponentProps> = ({ title, children, ...props }) => (
    <header {...props}><h1>{title || 'TODO test app'}</h1>{children}</header>
);