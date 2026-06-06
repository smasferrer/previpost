import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'article' | 'aside' | 'div' | 'section'
}

function Card({
  as: Component = 'div',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <Component
      className={`rounded-[0.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card
