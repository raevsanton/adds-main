import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { fetchCampaigns } from './createAsyncThunks'
import type { Campaign } from './types'

interface CampaignsState {
  entities: Campaign[]
  status: 'idle' | 'pending' | 'success' | 'failed'
}

const initialState: CampaignsState = {
  entities: [],
  status: 'idle',
}

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    removeCampaign: (state, action: PayloadAction<number>) => {
      state.entities = state.entities.filter(c => c.id !== action.payload)
    },
    addCampaign: (state, action: PayloadAction<Partial<Campaign>>) => {
      state.entities.push({
        id: Date.now(),
        name: action.payload.name ?? '',
        status: 'Active',
        paymentModel: '0.00067627 ฿',
        spendings: '$43.12',
        impressions: 123456,
        clicks: 9456,
        ctr: '0.5%',
      })
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampaigns.pending, state => {
        state.status = 'pending'
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.entities = action.payload
        state.status = 'success'
      })
      .addCase(fetchCampaigns.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const { removeCampaign, addCampaign } = campaignsSlice.actions
export default campaignsSlice.reducer
