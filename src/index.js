import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteSwitch from './Components/RouterSwitch.js'
import 'bootstrap/dist/css/bootstrap.css'
import './Styles/Index.css'
// import { Provider } from 'react-redux'
// import store from './Components/Store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
    <React.StrictMode>
      <RouteSwitch />
    </React.StrictMode>
  // { </Provider>  }
);


