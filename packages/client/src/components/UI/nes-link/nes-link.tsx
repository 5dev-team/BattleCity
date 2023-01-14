import React, { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

interface INesLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

const NesLink: React.FC<INesLinkProps> = ({ to, children, ...props }) => {
  return (
    <>
      <Link to={to} {...props} data-testid='nes-link'>
        {children}
      </Link>
    </>
  )
}

export default NesLink
