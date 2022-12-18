import { useAppSelector } from '@/hooks/redux'

export default function useAuth(): boolean {
  const { isLoggedIn } = useAppSelector(state => state.auth)
  
  return isLoggedIn
}
