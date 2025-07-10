import { TrashIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchCampaigns } from '../../store/campaigns/createAsyncThunks'
import { removeCampaign } from '../../store/campaigns/slice'
import type { Campaign } from '../../store/campaigns/types'
import { useAppDispatch, type RootState } from '../../store/store'
import { Button } from '../ui/Button'
import { BUTTON_VARIANT } from '../ui/Button/types'
import { Table } from '../ui/Table'

export const CampaignsTable = () => {
  const dispatch = useAppDispatch()
  const { entities: campaigns, status } = useSelector((state: RootState) => state.campaigns)

  useEffect(() => {
    dispatch(fetchCampaigns())
  }, [dispatch])

  if (status === 'failed') {
    return <p className="mt-7 flex w-full items-center justify-center text-red-400">Error</p>
  }

  return (
    <div className="mt-3 w-full">
      <Table<Campaign, keyof Campaign>
        isLoading={status === 'pending'}
        columns={[
          {
            key: 'name',
            header: 'Campaign',
            Cell: ({ row }) => (
              <span className="min-w-52 cursor-pointer text-[#00AAFF] hover:underline">
                {row.name}
              </span>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            Cell: ({ row }) => {
              const statusColor = {
                Active: 'bg-green-100 text-green-800',
                Paused: 'bg-red-100 text-red-800',
                Warning: 'bg-yellow-100 text-yellow-800',
              }[row.status]

              return (
                <span className={`rounded px-2 py-1 text-xs font-medium ${statusColor}`}>
                  {row.status}
                </span>
              )
            },
          },
          {
            key: 'paymentModel',
            header: 'Payment model',
            Cell: ({ row }) => (
              <span className="flex">
                CPD:
                <p className="ml-1 text-blue-500">{row.paymentModel}</p>
              </span>
            ),
          },
          {
            key: 'spendings',
            header: 'Spendings',
            Cell: ({ row }) => row.spendings,
          },
          {
            key: 'impressions',
            header: 'Impressions',
            Cell: ({ row }) => row.impressions.toLocaleString(),
          },
          {
            key: 'clicks',
            header: 'Clicks',
            Cell: ({ row }) => row.clicks.toLocaleString(),
          },
          {
            key: 'ctr',
            header: 'CTR',
            Cell: ({ row }) => row.ctr,
          },
          {
            key: 'id',
            header: '',
            Cell: ({ row }) => (
              <div className="flex w-full items-center justify-between">
                <Button
                  variant={BUTTON_VARIANT.SECONDARY}
                  className="w-full md:hidden"
                  onClick={() => null}
                >
                  Go to Campaign Page
                </Button>
                <TrashIcon
                  className="absolute right-3 h-5 w-5 cursor-pointer text-[#00AAFF] md:static"
                  onClick={() => dispatch(removeCampaign(row.id))}
                />
              </div>
            ),
          },
        ]}
        data={campaigns}
      />
    </div>
  )
}
