import { useAppSelector } from '@/hooks/redux'

export default function useAuth(): boolean | null  {
  const { isLoggedIn } = useAppSelector(state => state.auth)

  return isLoggedIn
}
