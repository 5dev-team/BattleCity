import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from '@/router'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { setupStore } from '@/store'
import { Provider } from 'react-redux'

if (typeof window !== 'undefined')
  import('./pwa')

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

