import { useState, useRef, useEffect } from 'react'

import Buff from '../components/Buff'
import Header from '../components/Header'
import Container from '../components/Container'
import TimeInput from '../components/TimeInput'

import { getSecondsFromTimeInput } from '../helpers/getSecondsFromTimeInput'
import { secondsToHHMMSS } from '../helpers/secondsToHHMMSS'
import ComposeBuffToVideo from '../components/ComposeBuffToVideo'

const initialInputValue = { timeInput: '00:00' }

export default function Home({ query }) {
  const [timer, setTimer] = useState(0)
  const [pause, setPause] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [showBuff, setShowBuff] = useState(false)
  const [error, setError] = useState<string>(null)
  const [timeInputValue, setTimeInputValue] = useState(initialInputValue)

  const intervalRef = useRef<NodeJS.Timeout>()
  const vidRef = useRef<HTMLVideoElement>(null)

  const { buff: buffId = 1 } = query
  const { timeInput } = timeInputValue

  const decreaseNum = () =>
    setTimer((prev) => {
      const newVal = prev - 1
      if (newVal <= 0) setShowBuff(true)
      return newVal
    })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setTimeInputValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    setPause(false)
    if (timer <= 0) return () => clearInterval(intervalRef.current)
    intervalRef.current = setInterval(decreaseNum, 1000)
    return () => clearInterval(intervalRef.current)
  }, [pause, timer])

  const startCountDown = () => {
    if (!pause) {
      clearInterval(intervalRef.current)
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000)
    }
    setPause((prev) => !prev)
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const time = getSecondsFromTimeInput(timeInputValue.timeInput)
    if (time <= 0) {
      setError('Please, select a time to start')
      return
    }
    setError(null)
    setShowBuff(false)
    setPlaying(true)
    playVideo()
    setTimer(time)
    startCountDown()
  }

  const playVideo = () => vidRef.current.play()

  const resetTimers = () => {
    setTimer(0)
    setTimeInputValue(initialInputValue)
  }

  const reset = () => {
    resetTimers()
    setShowBuff(false)
    setPlaying(false)
    vidRef.current.load()
  }

  const closeBuff = () => setShowBuff(false)

  return (
    <Container>
      <Header />
      <main>
        <section className="mb-6">
          <div className="px-4 border-b py-5">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 items-center">
              <div className="sm:col-span-1">
                <span className="font-bold text-3xl">
                  Select the minute to show the Buff component.
                </span>
              </div>
              <div className="sm:col-span-1">
                <TimeInput
                  handleTimeInputChange={handleChange}
                  value={timeInput}
                  name="timeInput"
                />

                <button
                  disabled={playing}
                  onClick={handleSubmit}
                  className={`ml-2 py-2 px-4 text-2xl rounded-lg bg-gray-800 text-white ${
                    playing ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'
                  }`}
                >
                  Start
                </button>
              </div>
              {error ? (
                <span className="text-gray-50 bg-red-600 px-2 py-1">{error}</span>
              ) : null}
            </div>
          </div>
        </section>
        <section>
          <div
            className={`flex items-center justify-between p-4 ${
              playing ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            <span className="text-white font-bold">
              The time at which the Buff will appear is:{' '}
              <span className="text-xl mx-1 underline">{secondsToHHMMSS(timer)}</span>{' '}
              minutes.
            </span>
            <div className="flex">
              <div>
                <button onClick={reset} className="video-btn">
                  Reset
                </button>
              </div>
            </div>
          </div>
          <ComposeBuffToVideo
            ref={vidRef}
            side="left"
            videoUrl="https://buffup-public.s3.eu-west-2.amazonaws.com/video/Auto+Buff+Stevie+G.mp4"
          >
            {/* To avoid having to do this we can create a wrapper around Buff
           to save the config of the condition to show/hide the Buff component */}
            {showBuff ? (
              <Buff
                buffId={buffId}
                show={showBuff}
                handleClose={closeBuff}
                timeToShow={20}
              />
            ) : null}
          </ComposeBuffToVideo>
        </section>
      </main>
    </Container>
  )
}

Home.getInitialProps = ({ query }) => {
  return { query }
}
