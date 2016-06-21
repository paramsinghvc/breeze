import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

export default function configureStore(initState) {
    return createStore(rootReducer, initState, applyMiddleware(thunkMiddleware));
}
