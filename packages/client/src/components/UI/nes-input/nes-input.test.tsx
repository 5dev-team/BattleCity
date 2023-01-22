import { render, screen } from '@testing-library/react'
import NesInput from '@/components/UI/nes-input'
import '@testing-library/jest-dom'
import { InputHTMLAttributes } from 'react'

describe('Wrapper NesInput', () => {
  const labelText = 'testLabelText'
  
  test('Should render standard NesInput', () => {
    render(<NesInput label={labelText}/>)

    const nesField = screen.getByTestId('nes-input__field')
    expect(nesField).toHaveClass('nes-field')
    
    const label = screen.getByTestId('nes-input__label')
    expect(label).toHaveTextContent(labelText)

    const input = screen.getByTestId('nes-input__input')
    expect(input).toHaveClass('nes-input nes-input__input nes-btn')
  })
  test('Should render NesInput from props', () => {

    render(<NesInput inline label={labelText} variant='success' fullWidth labelHidden plain />)

    const nesField = screen.getByTestId('nes-input__field')
    expect(nesField).toHaveClass('is-inline')

    const label = screen.getByTestId('nes-input__label')
    expect(label).toHaveClass('visually-hidden')
    
    const input = screen.getByTestId('nes-input__input')
    expect(input).toHaveClass('nes-input is-success nes-input__input plaintext')
    expect(input).toHaveAttribute('style', 'width: 100%;')
    expect(input).toHaveAttribute('readonly')
  })
  test('Should have native input props', () => {
    const nativeProps: InputHTMLAttributes<HTMLInputElement> = {
      type: 'file',
      accept: 'image/*',
      required: true,
    }

    render(<NesInput type={'submit'} label='' {...nativeProps}/>)

    const input = screen.getByTestId('nes-input__input')

    Object.keys(nativeProps).forEach(key => {
      expect(input).toHaveAttribute(key)
    })
  })
})
