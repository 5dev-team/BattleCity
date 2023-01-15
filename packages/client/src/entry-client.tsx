import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { Provider } from 'react-redux'
import { setupStore } from '@/store'

const store = setupStore()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(function (registration) {
      // Successful registration
      console.log(
        'Hooray. Registration successful, scope is:',
        registration.scope
      )
    })
    .catch(function (err) {
      // Failed registration, service worker won’t be installed
      console.log('Whoops. Service worker registration failed, error:', err)
    })
}
