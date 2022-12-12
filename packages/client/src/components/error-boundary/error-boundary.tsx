import React, { Component, ErrorInfo, ReactNode } from 'react'

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

export type FallbackProps = Partial<State>

interface ErrorBoundaryPropsWithComponent {
  children?: ReactNode
  FallbackComponent: React.ComponentType<FallbackProps>
}

type ErrorBoundaryProps = ErrorBoundaryPropsWithComponent

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    error: null,
    errorInfo: null,
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })

    console.error('ErrorBoundary catch component error:', error, errorInfo)
  }

  public render() {
    const { error, errorInfo } = this.state

    const { FallbackComponent } = this.props

    if (error || errorInfo) {
      return <FallbackComponent error={error} errorInfo={errorInfo} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
