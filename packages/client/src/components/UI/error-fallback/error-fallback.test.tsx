import { render, screen } from '@testing-library/react'
import ErrorFallback from '@/components/UI/error-fallback'
import '@testing-library/jest-dom'


describe('Wrapper GameButton', () => {
  const error = new Error('errorMessage')
  const errorInfo = { componentStack: 'componentStack' }
  test('Should render standard ErrorFallback', () => {
    const { container } = render(<ErrorFallback />)
    const div = container.firstChild
    expect(div).toHaveAttribute('role', 'alert')
    const h1Text = screen.getByText('Something went wrong :(')
    expect(h1Text).toHaveTextContent('Something went wrong :(')
  })
  test('Should render ErrorFallback from props ', () => {
    render(<ErrorFallback error={error} errorInfo={errorInfo} />)
    const h2 = screen.getByTestId('h2-ErrorFallBack')
    const paragraph = screen.getByTestId('p-ErrorFallBack')
    expect(h2).toHaveTextContent('errorMessage')
    expect(paragraph).toHaveTextContent('componentStack')
  })
})
