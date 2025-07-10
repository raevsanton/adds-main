import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { isMobile } from '../../../utils/media'
import type { Column } from './types'

export type TableProps<T, K extends keyof T> = {
  data: T[]
  columns: Column<T, K>[]
  isLoading: boolean
}

export const Table = <T, K extends keyof T>({ columns, data, isLoading }: TableProps<T, K>) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (isLoading) {
    return <p className="mt-7 flex justify-center text-[#00AAFF]">Loading...</p>
  }

  if (!data.length) {
    return <p className="mt-7 flex justify-center text-gray-400">No data</p>
  }

  if (!isMobile) {
    return (
      <table className="min-w-full border border-gray-200 bg-white text-sm">
        <thead>
          <tr className="text-left text-[#959A9D]">
            {columns.map((col, i) => (
              <th
                key={col.key.toString() + i}
                className="max-w-36 truncate border-b border-gray-200 p-3 font-normal"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(({ key, Cell }, j) => (
                <td key={key.toString() + j} className="max-w-36 border-b border-gray-200 p-3">
                  {Cell({ row })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((row, rowIndex) => {
        const isOpen = openIndex === rowIndex

        return (
          <div
            key={rowIndex}
            className="relative rounded-md border border-gray-200 bg-white px-4 py-3"
          >
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setOpenIndex(prev => (prev === rowIndex ? null : rowIndex))}
            >
              <div className="truncate font-medium text-[#00AAFF]">{columns[0].Cell({ row })}</div>
              <span className="text-xl">
                {isOpen ? (
                  <ChevronUpIcon className="h-6 w-6" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6" />
                )}
              </span>
            </div>
            {isOpen && (
              <div className="mt-3 space-y-2 text-[14px] text-gray-700">
                {columns.slice(1).map((col, colIndex) => (
                  <div key={col.key.toString() + colIndex} className="flex justify-between">
                    {col.header && <span className="font-medium text-gray-500">{col.header}</span>}
                    <span className="text-right">{col.Cell({ row })}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
