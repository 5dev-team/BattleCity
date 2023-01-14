import { render, screen } from '@testing-library/react'
import NesLink from '@/components/UI/nes-link'
import { unstable_HistoryRouter as Router } from 'react-router-dom'
import history from '@/utils/history'
import '@testing-library/jest-dom'

describe('nes-link', () => {
  test('Should render with prop to',  () => {
    render(
      <Router history={history}>
        <NesLink to={'/start'} />
      </Router>
    )
    expect(screen.getByTestId('nes-link')).toHaveAttribute('href', '/start')
  })
  
  test('Should render with children', async () => {
    render(
      <Router history={history}>
        <NesLink to={'/start'}>I am children</NesLink>
      </Router>
    )
    expect(screen.getByTestId('nes-link')).toHaveTextContent('I am children')
  })
})
