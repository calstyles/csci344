import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {getAccessToken, getCookie} from './utils';

function renderApp(token) {
    ReactDOM.render(
        <App token={token} />,
        document.getElementById('root')
    );
}

async function getAccessTokenAndRenderApp() {
    // this initializes the app after the access token is set.
    const csrf = getCookie('csrf_access_token') ;
    if (csrf && window.location.port !== '3000' && window.location.port !== '5000') {
        // this executes if the app is run within flask:
        console.log('Authentication handled via CSRF + Http-only cookie.')
        renderApp();
    } else {
        console.log(window.location.port === '3000')
        // this executes if the app is run via npm start
        console.log('Authentication handled via REST API Token.')
        const token = await getAccessToken('webdev', 'password');
        renderApp(token);
    }
}

getAccessTokenAndRenderApp();