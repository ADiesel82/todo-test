import * as React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout: React.SFC<{}> = props => (
  <>
    <Header title="Simple TODO application">
      <h3>react application</h3>
    </Header>
    {props.children}
    <Footer />
  </>
);
