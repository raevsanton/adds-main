export type CampaignStatus = 'Active' | 'Paused' | 'Warning'

export interface Campaign {
  id: number
  name: string
  status: CampaignStatus
  paymentModel: string
  spendings: string
  impressions: number
  clicks: number
  ctr: string
}
