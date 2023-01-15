import { render, screen } from '@testing-library/react'
import NesLink from '@/components/UI/nes-link'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

describe('nes-link', () => {
  test('Should render with prop to',  () => {
    render(
      <BrowserRouter>
        <NesLink to={'/start'} />
      </BrowserRouter>
    )
    expect(screen.getByTestId('nes-link')).toHaveAttribute('href', '/start')
  })
  
  test('Should render with children', async () => {
    render(
      <BrowserRouter>
        <NesLink to={'/start'}>I am children</NesLink>
      </BrowserRouter>
    )
    expect(screen.getByTestId('nes-link')).toHaveTextContent('I am children')
  })
})
