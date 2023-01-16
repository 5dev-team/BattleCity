import { render, screen } from '@testing-library/react'
import GameButton from '@/components/UI/game-button'
import '@testing-library/jest-dom'

describe('Wrapper GameButton', () => {
  test('Should render standard GameButton', () => {
    const { container } = render(<GameButton />)
    const div = container.firstChild
    expect(div).toHaveAttribute('class', 'bc-btn')
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bc-btn__button')
  })
  test('Should render GameButton from props and children', () => {
    render(<GameButton icon='testIco'>defaultTextButton</GameButton>)
    const gameImg = screen.getByRole('img')
    expect(gameImg).toHaveAttribute('src', 'testIco')
    expect(gameImg).toHaveAttribute('alt', 'Pointer Icon')
    expect(gameImg).toHaveClass('bc-btn__icon')
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('defaultTextButton')
  })
})
