import * as React from 'react';
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './scss/index.scss'
import {Provider} from "react-redux";
const store = setupStore()
import {setupStore} from "./store";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)