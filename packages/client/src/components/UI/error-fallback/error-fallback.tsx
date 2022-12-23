import React from 'react'
import { FallbackProps } from '@/components/error-boundary/error-boundary'

const ErrorFallback: React.FC<FallbackProps> = ({ error, errorInfo }) => {
  return (
    <div role='alert'>
      <h1>Something went wrong :(</h1>
      {error && <h2 data-testid='h2'>{error.message}</h2>}
      {errorInfo && <p data-testid='p'>{errorInfo.componentStack}</p>}
    </div>
  )
}

export default ErrorFallback
