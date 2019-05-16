import * as React from 'react';
import * as ReactDOM from '@hot-loader/react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from 'store';
import { Router } from 'react-router';
import { App } from './App';

// prepare store
const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);