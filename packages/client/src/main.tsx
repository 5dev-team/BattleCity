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
