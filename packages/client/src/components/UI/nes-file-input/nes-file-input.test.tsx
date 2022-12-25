import { render, screen } from '@testing-library/react'
import NesFileInput from '@/components/UI/nes-file-input'
import avatarPlaceholder from '@/assets/avatarPlaceholder.png'
import { useForm } from 'react-hook-form'
import '@testing-library/jest-dom'

describe('Wrapper NesFileInput', () => {
  const commonProps = {
    name: '',
    label: '',
    alt: '',
    src: '',
  }

  test(`Input should be type of 'file'`, () => {
    const Component = () => {
      const { control } = useForm()

      return <NesFileInput control={control} {...commonProps} />
    }

    render(<Component />)

    const input = screen.getByTestId('nes-file-input__input')

    expect(input).toHaveAttribute('type', 'file')
  })

  test('Input should be disabled when plain', () => {
    const Component = () => {
      const { control } = useForm()

      return <NesFileInput control={control} {...commonProps} plain />
    }

    render(<Component />)

    const input = screen.getByTestId('nes-file-input__input')

    expect(input).toHaveAttribute('disabled')
  })

  test(`Should be image if src is not empty`, () => {
    const Component = () => {
      const { control } = useForm()

      return (
        <NesFileInput
          control={control}
          {...commonProps}
          src={avatarPlaceholder}
        />
      )
    }

    render(<Component />)

    const image = screen.getByRole('img')

    expect(image).toHaveAttribute('src', '[object Object]')
  })
})
