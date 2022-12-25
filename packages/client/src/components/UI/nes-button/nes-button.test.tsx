import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NesButton from '@/components/UI/nes-button'

describe('nes-button', () => {
  test('Should render without props', async () => {
    render(<NesButton></NesButton>)
    expect(screen.getByRole('button')).toHaveClass('nes-btn ')
  })
  test('Should render with props', async () => {
    render(<NesButton variant='primary' fullWidth></NesButton>)
    expect(screen.getByRole('button')).toHaveClass('nes-btn is-primary')
    expect(screen.getByRole('button')).toHaveStyle('width: 100%')
  })
  test('Should render with children', async () => {
    render(<NesButton>I am children</NesButton>)
    expect(screen.getByRole('button')).toHaveTextContent('I am children')
  })
  test('Should render with some prop', async () => {
    render(<NesButton disabled></NesButton>)
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
  })
})
