import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { ThingListProvider } from './contexts/ThingListContext'
import { ThingProvider } from './contexts/ThingContext'
import App from './components/App/App'
import './index.css'




ReactDOM.render(
  <BrowserRouter>
    <ThingListProvider>
      <ThingProvider>
        <App />
      </ThingProvider>
    </ThingListProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
