import React, { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

interface INesLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string
}

const NesLink: React.FC<INesLinkProps> = ({ to, children, ...props }) => {
  return (
    <>
      {to ? (
        <Link to={to} {...props}>
          {children}
        </Link>
      ) : (
        <a {...props}>{children}</a>
      )}
    </>
  )
}

export default NesLink
