import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { ElementListProvider } from './contexts/ElementListContext'
import { ElementProvider } from './contexts/AppContext'
import App from './components/App/App'
import './index.css'




ReactDOM.render(
  <BrowserRouter>
    <ElementListProvider>
      <ElementProvider>
        <App />
      </ElementProvider>
    </ElementListProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
