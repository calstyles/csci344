import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {getAccessToken, getCookie} from './utils';

const token = await getAccessToken('webdev', 'password');

function renderApp(token) {
    ReactDOM.render(
        <App token={token} />,
        document.getElementById('root')
    );
}

renderApp();