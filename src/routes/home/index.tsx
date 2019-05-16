import * as React from 'react';
import { Layout } from '../../components/Layout';
import Todo from 'components/Todo';

export const Home: React.SFC = () => (
    <Layout>
        <Todo />
    </Layout>
);