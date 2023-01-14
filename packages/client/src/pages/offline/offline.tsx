import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import NesButton from '@/components/UI/nes-button'

const Offline: FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className=''>
        <span>Oops!</span>
        <h1>You are offline</h1>
        <span>Your device is offline. Check your network connection.</span>
      </div>
      <div>
        <span>Or... You can play without saving scores</span>
        <NesButton onClick={() => navigate('/')}>
          Just click me!
        </NesButton>
      </div>
    </>
  )
}
export default Offline
