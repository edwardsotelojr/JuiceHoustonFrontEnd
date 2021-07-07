import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./redux/store";


render(
    <Provider store = {store}>
        <BrowserRouter>
<App />
</BrowserRouter>
    </Provider>, document.getElementById('root')
    )
