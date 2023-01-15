import { renderToString } from 'react-dom/server'
import { Router } from './router'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { setupStore } from '@/store'

const store = setupStore()

interface IRenderProps {
  url: string
}

export function render({ url }: IRenderProps) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <Router />
      </StaticRouter>
    </Provider>
  )
}
