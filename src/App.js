// // in src/App.js
import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';

// redux, react-router, redux-form, saga, and material-ui
// form the 'kernel' on which admin-on-rest runs
import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createHashHistory';
import {Switch, Route} from 'react-router-dom';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';


// prebuilt admin-on-rest features
import {
    adminReducer,
    localeReducer,
    crudSaga,
    simpleRestClient,
    Delete,
    TranslationProvider,
} from 'admin-on-rest';

// your app components
import Dashboard from './app/components/Dashboard';
// import PostList from './app/components/Post';
import myCustomTheme from './app/mui/myCustomTheme';

// your app labels
import messages from './app/i18n';

// create a Redux app
const reducer = combineReducers({
    admin: adminReducer([{name: 'domain'}]),
    locale: localeReducer(),
    form: formReducer,
    routing: routerReducer,
});
const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const store = createStore(reducer, undefined, compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));
const restClient = simpleRestClient('http://localhost:8000/api/v1');
sagaMiddleware.run(crudSaga(restClient));

// bootstrap redux and the routes
const App = () => (
    <Provider store={store}>
        <TranslationProvider messages={messages}>
            <ConnectedRouter history={history}>
                <MuiThemeProvider muiTheme={getMuiTheme(myCustomTheme)}>
                    <div>
                        <AppBar title="Mobius Admin"/>
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </ConnectedRouter>
        </TranslationProvider>
    </Provider>
);

export default App;
