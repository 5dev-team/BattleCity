import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GameMenu from '@/components/UI/game-menu/game-menu'
import '@testing-library/jest-dom'

describe('Wrapper GameMenu', () => {
  test('Should change button on click arrow up and arrow down', () => {
    const changeActiveBtn = jest.fn()
    const { container } =  render(<GameMenu selectItemId={3} />)
    expect(changeActiveBtn).toHaveBeenCalledTimes(0)
    userEvent.keyboard('{ArrowUp}')
    expect(changeActiveBtn).toHaveBeenCalledTimes(1)
  })
})
