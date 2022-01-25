//import './index.css';
// ----------------
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.scss';
// import App from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import store from './redux/store/store';
// import { persistStore } from 'redux-persist';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { ApolloProvider } from '@apollo/client';
// import client from './apolloClient';
// import keycloak from './keycloak';
// import { userLogin } from './redux/actions/user';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
// import "bootstrap-icons/font/bootstrap-icons.css";

// ----------------
//import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store/store';
import { userLogin } from './redux/actions/user';
import { Provider } from 'react-redux';
import keycloak from './keycloak';
import reportWebVitals from './reportWebVitals';
import Layout from './components/layout/Layout';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { persistStore } from 'redux-persist';

import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
const persistor = persistStore(store);

const initOptions = {
  onLoad: 'check-sso',
  checkLoginIframe: false,
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
};


const getUser = (event) => {
  if (event === 'onAuthSuccess') {
    store.dispatch(userLogin(keycloak.tokenParsed.sub));
  }
};

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
     <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} onEvent={getUser}>
     <Provider store={store}>
     <Layout/>

     </Provider>
    </ReactKeycloakProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
