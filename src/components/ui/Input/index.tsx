import { cn } from '../../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  placeholder?: string
  classNames?: {
    label?: string
    input?: string
  }
}

export const Input = ({ label, placeholder, classNames, ...props }: InputProps) => {
  return (
    <>
      {label && <label className={cn('mb-2 block', classNames?.label)}>{label}</label>}
      <input
        {...props}
        placeholder={placeholder}
        className={cn(
          'block w-full rounded-md border border-gray-200 p-2',
          classNames?.input,
          classNames,
        )}
      />
    </>
  )
}
