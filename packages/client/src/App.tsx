import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Router } from '@/router'

const App: React.FC = () => {
  const [search, setSearch] = useSearchParams()

  useEffect(() => {
    const yandexOauthCode = search.get('code')

    if (yandexOauthCode !== null) {
      search.delete('code')
      setSearch(search)
    }
  }, [])

  return <Router />
}

export default App
