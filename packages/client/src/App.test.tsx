import App from './App'
import { Provider } from 'react-redux'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ShallowRenderer = require('react-test-renderer/shallow')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configureStore = require('redux-mock-store').default


describe('Wrapper App', () => {
  const initialState = { defaultValue: 1 }
  const mockStore = configureStore()
  let store

  test('Should render App', () => {
    const renderer = new ShallowRenderer()
    store = mockStore(initialState)
    renderer.render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })

})
