import { render } from '@testing-library/react'
import NesButton from '@/components/UI/nes-button'

describe('Wrapper App', () => {
  test('Should render App', () => {
  render(<NesButton />)
  })
})
