import { BUTTON_VARIANT } from './types'

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: BUTTON_VARIANT
  icon?: React.ReactNode
  iconClassName?: string
}

const variantClasses = {
  [BUTTON_VARIANT.PRIMARY]: 'bg-[#00AAFF] border-none text-white',
  [BUTTON_VARIANT.SECONDARY]: 'bg-white',
}

const baseClass =
  'border border-[rgba(216,223,227,1)] p-2 rounded-lg disabled:opacity-50 flex items-center p-2'

export const Button = ({
  children,
  className = '',
  variant = BUTTON_VARIANT.PRIMARY,
  icon,
  iconClassName = 'mr-2',
  ...props
}: ButtonProps) => {
  return (
    <button className={`${baseClass} ${variantClasses[variant]} ${className}`} {...props}>
      {icon && <span className={`${iconClassName} block h-6 w-6`}>{icon}</span>}
      {children}
    </button>
  )
}
