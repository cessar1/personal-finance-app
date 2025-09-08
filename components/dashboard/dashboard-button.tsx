// components/ui/dashboard-button.tsx
import React from 'react'

type Variant = 'red' | 'yellow' | 'green' | 'blue'

type DashboardButtonProps = {
  children: React.ReactNode
  label: string
  variant?: Variant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function DashboardButton({
  children,
  label,
  variant = 'red',
  className = '',

  ...props
}: DashboardButtonProps) {
  const variantClasses: Record<Variant, string> = {
    red: 'outline-red-500',
    yellow: 'outline-yellow-500',
    green: 'outline-green-500',
    blue: 'outline-blue-500',
  }

  return (
    <button
      className={`flex items-center gap-4 px-3 py-1 rounded outline outline-2 outline-offset-2 hover:opacity-80 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {label}
      {children}
    </button>
  )
}
