import { createAsyncThunk } from '@reduxjs/toolkit'
import { MOCK_CAMPAIGNS } from './mocks'

export const fetchCampaigns = createAsyncThunk('campaigns/fetchCampaigns', async () => {
  const response = await fetch('/api/campaigns')
  if (!response.ok) throw new Error('Failed to fetch campaigns')
  return MOCK_CAMPAIGNS
})
