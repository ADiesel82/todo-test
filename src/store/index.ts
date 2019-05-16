import { Store, createStore } from 'redux';
import { State } from './types';
import { rootReducer } from './reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

export function configureStore(initialState?: State): Store<State> {
    let middleware;

    if (process.env.NODE_ENV !== 'production') {
        middleware = devToolsEnhancer({});
    }

    const store = createStore(rootReducer, initialState, middleware);

    if (module.hot) {
        module.hot.accept('../store', () =>
            store.replaceReducer(require('../store').default()),
        );
    }

    return store;
}