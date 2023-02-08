import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from '@/store'
import App from '@/App'
import { fetchUser, fetchYandexSignIn } from '@/store/slices/auth'

const store = setupStore(JSON.parse(window.__PRELOADED_STATE__ || ''))

delete window.__PRELOADED_STATE__

const yandexCodeParam = /code=([^&]+)/.exec(window.location.search)
if (yandexCodeParam !== null) {
  store
    .dispatch(fetchYandexSignIn(yandexCodeParam[1]))
    .then(() => store.dispatch(fetchUser()))
} else {
  store.dispatch(fetchUser())
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./sw.js')
//     .then(function (registration) {
//       // Successful registration
//       console.log(
//         'Hooray. Registration successful, scope is:',
//         registration.scope
//       )
//     })
//     .catch(function (err) {
//       // Failed registration, service worker won’t be installed
//       console.log('Whoops. Service worker registration failed, error:', err)
//     })
// }
