import App from './App'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ShallowRenderer = require('react-test-renderer/shallow')

jest.mock('react-redux')

describe('Wrapper App', () => {
  const renderer = new ShallowRenderer()
  test('Should render App', () => {
    renderer.render(<App />)
  })
})
