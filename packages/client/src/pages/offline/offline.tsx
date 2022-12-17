import React from 'react'

interface IOfflineProps {
  children: React.ReactNode
}

const Offline: React.FC<IOfflineProps> = ({ children }) => {
  
  return (
    <>
      {children}
    </>
  )
}

export default Offline
