import { createPortal } from 'react-dom'
import { cn } from '../../../utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export const Modal = ({ isOpen, onClose, children, className = '' }: ModalProps) => {
  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className={cn(className, 'relative w-full max-w-[580px] rounded-xl bg-white p-6 shadow-lg')}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-10 right-10 flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
