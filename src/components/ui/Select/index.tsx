import { useEffect, useRef, useState } from 'react'
import { cn } from '../../../utils/cn'

export type Option = {
  label: string
  value: string | number
}

interface CustomSelectProps {
  label?: string
  placeholder?: string
  options: Option[]
  value: Option | null
  onChange: (option: Option) => void
  classNames?: {
    label?: string
    button?: string
    option?: string
  }
}

export const Select = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  classNames,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full" ref={ref}>
      {label && <label className={cn('mb-2 block', classNames?.label)}>{label}</label>}

      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={cn(
          'w-full rounded-md border border-gray-200 bg-white p-2 text-left text-gray-900',
          classNames?.button,
        )}
      >
        {value?.label || <span className="text-gray-400">{placeholder}</span>}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map(opt => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt)
                setIsOpen(false)
              }}
              className={cn('cursor-pointer px-4 py-2 hover:bg-gray-100', classNames?.option)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
