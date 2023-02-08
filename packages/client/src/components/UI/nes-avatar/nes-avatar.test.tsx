import { render, screen } from '@testing-library/react'
import NesAvatar from '@/components/UI/nes-avatar/'
import '@testing-library/jest-dom'

describe('Wrapper NesAvatar', () => {
  test('Should render standard NesAvatar', () => {
    render(<NesAvatar />)
    const logoProfile = screen.getByRole('img')
    expect(logoProfile).toHaveAttribute('src', '[object Object]')
    expect(logoProfile).toHaveAttribute('alt', 'аватар пользователя')
    expect(logoProfile).toHaveClass('nes-avatar  avatar')
  })
  test('Should render NesAvatar from props', () => {
    render(<NesAvatar size='medium' image='testUrl' rounded={true} alt='testName' />)
    const logoProfile = screen.getByRole('img')
    expect(logoProfile).toHaveAttribute('src', 'testUrl')
    expect(logoProfile).toHaveAttribute('alt', 'testName')
    expect(logoProfile).toHaveClass('nes-avatar is-medium is-rounded avatar')
  })
})
