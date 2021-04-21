import React from 'react'

interface TimeInputProps {
  handleTimeInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  name: string
  placeholder?: string
}

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  name,
  placeholder,
  handleTimeInputChange,
}) => {
  return (
    <input
      className="border py-2 px-4 text-2xl border-gray-200 rounded-lg"
      value={value}
      name={name}
      required
      placeholder={placeholder}
      onChange={handleTimeInputChange}
      type="time"
    />
  )
}

export default TimeInput
