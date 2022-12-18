import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { setupStore } from '@/store'
import { Provider } from 'react-redux'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className='app-wrapper'>
        <App />
      </div>
    </Provider>
  </React.StrictMode>
)

// Check for browser support of service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.ts')
  .then(function(registration) {
    // Successful registration
    console.log('Hooray. Registration successful, scope is:', registration.scope)
  }).catch(function(err) {
    // Failed registration, service worker won’t be installed
    console.log('Whoops. Service worker registration failed, error:', err)
  })
}
