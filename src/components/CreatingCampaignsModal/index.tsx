import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCampaign } from '../../store/campaigns/slice'
import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'
import { BUTTON_VARIANT } from '../ui/Button/types'
import { Checkbox } from '../ui/Checkbox'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'
import { Select, type Option } from '../ui/Select'

const MOCK_LANGUAGES_OPTIONS: Option[] = [
  { label: 'English', value: 'en' },
  { label: 'Russian', value: 'ru' },
  { label: 'Serbian', value: 'rs' },
]

const MOCK_RATING_OPTIONS = [
  { id: 'gambling', label: 'Gambling' },
  { id: 'investments', label: 'Investments' },
  { id: 'adults', label: 'Adults (18+)' },
  { id: 'risky', label: 'Risky Project' },
]

interface CreatingCampaignsModalProps {
  isModalOpen: boolean
  setIsModalOpen: (status: boolean) => void
}

interface FormState {
  selectedLanguage: Option | null
  selectedRating: string[]
  campaignName: string
}

const initialFormData = {
  selectedLanguage: null,
  selectedRating: [],
  campaignName: '',
}

export const CreatingCampaignsModal = ({
  isModalOpen,
  setIsModalOpen,
}: CreatingCampaignsModalProps) => {
  const dispatch = useDispatch()

  const [form, setForm] = useState<FormState>(initialFormData)

  const handleChange = <T extends keyof FormState>(name: T, value: FormState[T]) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreating = () => {
    dispatch(addCampaign({ name: form.campaignName }))
    handleCanceling()
  }

  const handleCanceling = () => {
    setIsModalOpen(false)
    setForm(initialFormData)
  }

  const toggleRating = (id: string) => {
    setForm(prev => ({
      ...prev,
      selectedRating: prev.selectedRating.includes(id)
        ? prev.selectedRating.filter(item => item !== id)
        : [...prev.selectedRating, id],
    }))
  }

  return (
    <Modal isOpen={isModalOpen} onClose={handleCanceling}>
      <h1>Create New Campaign</h1>

      <Input
        value={form.campaignName}
        onChange={e => handleChange('campaignName', e.target.value)}
        label="Campaign name"
        placeholder="Campaign name"
        classNames={{ label: 'mt-10' }}
      />

      <Select
        label="Language"
        placeholder="Choose language"
        options={MOCK_LANGUAGES_OPTIONS}
        value={form.selectedLanguage}
        onChange={value => handleChange('selectedLanguage', value)}
        classNames={{ label: 'mt-3' }}
      />

      <fieldset className="mt-3">
        <legend className="mb-2">Ratings</legend>
        <div className="flex flex-wrap gap-4">
          {MOCK_RATING_OPTIONS.map(option => (
            <Checkbox
              key={option.id}
              id={option.id}
              label={option.label}
              checked={form.selectedRating.includes(option.id)}
              onChange={() => toggleRating(option.id)}
              className={cn(
                'transition-colors',
                form.selectedRating.includes(option.id) && 'text-white !ring-0 !outline-none',
              )}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex justify-end gap-4">
        <Button variant={BUTTON_VARIANT.SECONDARY} onClick={handleCanceling}>
          Cancel
        </Button>
        <Button disabled={!form.campaignName.length} onClick={handleCreating}>
          Create Campaign
        </Button>
      </div>
    </Modal>
  )
}
