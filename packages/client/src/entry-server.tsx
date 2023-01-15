import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { setupStore } from '@/store'
import App from '@/App'

const store = setupStore()

interface IRenderProps {
  url: string
}

export function render({ url }: IRenderProps) {
  return {
    html: renderToString(
      <Provider store={store}>
        <StaticRouter location={url}>
          <App/>
        </StaticRouter>
      </Provider>
    ),
    state: store.getState(),
  }
}
