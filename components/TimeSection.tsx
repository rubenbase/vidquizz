import React from 'react'
// import TimeInput from './TimeInput'

interface TimeSectionProps {
  title?: string
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleTimeInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TimeSection: React.FC<TimeSectionProps> = ({
  title = 'Set the timer for your Buff to show up',
  handleSubmit,
  handleTimeInputChange,
}) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 items-center">
      <div className="sm:col-span-1">
        {title && <span className="font-bold text-3xl">{title}</span>}
      </div>
      <div className="sm:col-span-1">
        <form onSubmit={handleSubmit}>
          {/* <TimeInput handleTimeInputChange={handleTimeInputChange} /> */}
          <button
            type="submit"
            value="Submit"
            className="ml-2 py-2 px-4 text-2xl rounded-lg bg-gray-800 text-white"
          >
            Save time
          </button>
        </form>
      </div>
    </div>
  )
}

export default TimeSection
