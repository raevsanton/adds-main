import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import logo from './assets/logo.svg'
import { CampaignsTable } from './components/CampaignsTable'
import { CreatingCampaignsModal } from './components/CreatingCampaignsModal'
import { Button } from './components/ui/Button'
import { BUTTON_VARIANT } from './components/ui/Button/types'

const STOCK_DATA = [
  {
    title: 'Impressions/day',
    value: '229 M',
    icon: <ArrowUpIcon className="h-5 w-5 text-green-600" />,
    percent: '1.78',
    text: '8.3M unique IPs',
  },
  {
    title: 'Active ad units',
    value: '8796 K',
    icon: <ArrowDownIcon className="h-5 w-5 text-red-600" />,
    percent: '1.78',
    text: 'over 6K publishers',
  },
  {
    title: 'Publishers earn/month',
    value: '$1000',
    icon: <ArrowUpIcon className="h-5 w-5 text-green-600" />,
    percent: '3.17',
    text: 'from 408 ad campaigns',
  },
]

const MENU_ITEMS = ['Advertise', 'Earn', 'Marketplace', 'Stats']

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <CreatingCampaignsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <header className="relative h-20 shadow-[0px_2px_16px_0px_rgba(15,35,63,0.12)]">
        <div className="container flex h-20 items-center justify-between">
          <img src={logo} alt="logo" />
          <button
            className="absolute right-4 z-30 p-2 focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-10 w-10 text-[#00AAFF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <nav className="z-20">
            <ul
              className={`md:flex md:space-x-8 md:py-0 ${isMenuOpen ? 'block' : 'hidden'} absolute top-20 right-0 border-t border-gray-200 bg-white shadow-md md:static md:block md:border-0 md:border-none md:bg-transparent md:shadow-none`}
            >
              {MENU_ITEMS.map(item => (
                <li
                  key={item}
                  className="border-b border-gray-200 px-4 py-2 text-lg font-semibold text-[#263238] last:border-0 md:border-0 md:border-none md:p-0"
                >
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section>
          <div className="container flex flex-col items-center justify-between pt-16 md:flex-row">
            <div className="w-full md:max-w-[420px]">
              <h1 className="mb-3.5">
                The first crypto & bitcoin advertising network in the market
              </h1>
              <p className="mb-5 text-base">
                Skyrocket your publisher earnings with our game-changing traffic monetization
                solution
              </p>
            </div>
            <div className="flex w-full flex-col flex-wrap justify-around gap-8 md:w-auto md:flex-row">
              {STOCK_DATA.map(({ title, value, icon, percent, text }, index) => (
                <div key={title} className="relative flex flex-col gap-1">
                  <p className="font-bold">{title}</p>
                  <div className="absolute right-0 flex items-center gap-2 md:static">
                    <div className="text-2xl font-bold">{value}</div>
                    {icon}
                    {percent}
                  </div>
                  <p className="text-[#6B7073]">{text}</p>
                  {index !== STOCK_DATA.length - 1 && <hr className="mt-2 md:hidden" />}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="container flex flex-col items-center justify-between pt-16">
            <div className="flex w-full flex-wrap items-center justify-between">
              <h3>Campaigns</h3>
              <Button
                variant={BUTTON_VARIANT.SECONDARY}
                icon={<PlusIcon />}
                onClick={() => setIsModalOpen(true)}
              >
                Create New Campaign
              </Button>
            </div>
            <CampaignsTable />
          </div>
        </section>
      </main>
      <footer>
        <div className="container flex flex-col items-start justify-center pt-3 md:items-center">
          <nav className="w-full text-base font-bold md:w-auto">
            <ul className="flex flex-col space-x-8 py-4 text-left md:flex-row">
              {MENU_ITEMS.map(item => (
                <>
                  <li key={item} className="text-[#263238]">
                    <a>{item}</a>
                  </li>
                  <hr className="my-3 w-full md:hidden" />
                </>
              ))}
            </ul>
          </nav>
        </div>
        <hr className="my-4 hidden md:block" />
        <div className="container flex flex-col-reverse items-center justify-between gap-2 text-[#6B7073] md:flex-row">
          <p>© A-ADS 2011-{new Date().getFullYear()}</p>
          <div className="flex gap-2">
            <a>Terms of Service</a>
            <a>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
