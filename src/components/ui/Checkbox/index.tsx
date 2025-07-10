import { cn } from '../../../utils/cn'

interface CheckboxProps {
  label?: string
  id: string
  onChange: () => void
  checked: boolean
  disabled?: boolean
  className?: string
  danger?: boolean
}

export const Checkbox = ({
  id,
  label,
  onChange,
  checked,
  disabled,
  className,
  danger,
}: CheckboxProps) => {
  return (
    <div className="relative flex items-center gap-2">
      <label htmlFor={id} className="flex cursor-pointer items-center gap-2">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded border border-gray-300 transition-colors',
            'peer-checked:border-[#00AAFF] peer-checked:bg-[#00AAFF]',
            disabled && 'cursor-not-allowed opacity-50',
            danger && 'text-red-500',
            className,
          )}
        >
          {checked && (
            <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <span className="text-[14px]">{label}</span>
      </label>
    </div>
  )
}
