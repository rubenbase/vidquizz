import React, { useEffect, useState, useRef } from 'react'

import { useFetch } from '../hooks/use-fetch'

import styles from './Buff.module.scss'
import Chrono from './Chrono'

const ANSWER_STYLES = {
  correct: 'bg-green-500',
  incorrect: 'bg-red-500',
}

interface Answer {
  title: string
  image: string[]
  id: number
  correctAnswer: boolean
}

interface Author {
  first_name: string
  last_name: string
  photo: string[]
}

interface Buff {
  question: string
  answers: Answer[]
  author: Author
}

export default function Buff({
  buffId,
  show,
  handleClose,
  timeToShow,
}: {
  buffId: string
  show: boolean
  handleClose: () => void
  timeToShow: number
}) {
  const [buffIsClickable, setBuffClickable] = useState(false)
  const [answerStatus, setAnswerStatus] = useState<string>(null)
  const [selectedAnswerId, setSelectedAnswerId] = useState<number>(null)
  const [timeToActivateQuestions, setTimeToActivateQuestions] = useState(5)

  const intervalRef = useRef<NodeJS.Timeout>()

  const { data, error, loading } = useFetch<Buff>(
    `https://demo2373134.mockable.io/buff/${buffId}`
  )

  const decreaseNum = () =>
    setTimeToActivateQuestions((prev) => {
      const newVal = prev - 1
      if (newVal <= 0) setBuffClickable(true)
      return newVal
    })

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000)
  }, [])

  useEffect(() => {
    const timeToClose = setTimeout(() => handleClose(), (timeToShow + 3) * 1000)
    return () => {
      clearTimeout(timeToClose)
    }
  }, [])
  useEffect(() => {
    if (timeToActivateQuestions <= 0) return () => clearInterval(intervalRef.current)
    intervalRef.current = setInterval(decreaseNum, 1000)
    return () => clearInterval(intervalRef.current)
  }, [timeToActivateQuestions])

  const selectAnswer = (answer: Answer) => {
    if (selectedAnswerId || !buffIsClickable) return
    answer.correctAnswer ? setAnswerStatus('correct') : setAnswerStatus('incorrect')
    setSelectedAnswerId(answer.id)
  }

  const addCorrectAnswerMock = (answers: Answer[]): Answer[] => {
    return answers.map((ans, i) => {
      if (i === 0) return { ...ans, correctAnswer: true }
      return { ...ans, correctAnswer: false }
    })
  }

  if (loading) return null
  if (error) {
    console.error({ error })
    return null
  }

  const { first_name: firstName, last_name: lastName } = data?.author
  const answers = addCorrectAnswerMock(data?.answers)

  return (
    <>
      {show ? (
        <div className="flex flex-col w-96">
          {/* Top row */}
          <div className={`inline-flex items-center mb-2`}>
            {/* User */}
            <div
              className={`inline-flex py-1 px-2 mr-7 w-56 items-center ${styles.author} ${styles.lightBackground}`}
            >
              <img
                className="inline-block h-10 w-10 rounded-full z-10"
                src={data?.author?.photo[0]}
                alt=""
              />
              <span className="ml-3 mt-0.5 font-bold text-gray-800">{`${firstName} ${lastName}`}</span>
            </div>
            {/* Yellow circle */}
            <div className="flex items-center justify-center h-8 w-8 p-1 bg-yellow-300 rounded-full border-2 border-white mr-20">
              <span className="text-white">2</span>
            </div>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-0 top-0 flex items-center justify-center p-2 h-8 w-8 bg-gray-400 rounded-full z-50"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                strokeWidth="2px"
                stroke="#1f1f1f"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* Question row */}
          <div className={`flex relative rounded-2xl pb-3 mb-2 ${styles.darkBackground}`}>
            {/* question */}
            <div className="py-2 px-4 mr-10 text-gray-100 text-xl font-bold">
              {data?.question}
            </div>
            {/* time left */}
            {/* <div className="absolute top-0 right-0 flex items-center mr-1 mt-1 justify-center h-10 w-10 rounded-full bg-gray-800 border-4 border-gray-400"> */}
            <div className="absolute top-0 right-0 mr-3 mt-2 mb-2">
              <Chrono timeToShow={timeToShow} />
            </div>
          </div>
          {/* Answers */}
          <div className="flex flex-col mb-2">
            {answers.map((answer) => (
              <div
                key={answer.id}
                // to avoid inline func we can create a new component and pass id and a func as props and
                // call them within that component, but for time sake I'm going to do it inline
                onClick={() => selectAnswer(answer)}
                className={`${
                  buffIsClickable && !selectedAnswerId
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed'
                } z-50 inline-flex items-center mb-2 mr-10 ${
                  answerStatus && answer.id === selectedAnswerId
                    ? ANSWER_STYLES[answerStatus]
                    : styles.lightBackground
                } ${styles.answerBorderRadius}`}
              >
                <div className="flex items-center justify-center h-10 w-10 m-1 rounded-full z-10 bg-gray-700 mr-2">
                  <img
                    className="inline-block h-10 w-10 rounded-full z-10 object-cover"
                    src={answer?.image[0]}
                    alt=""
                  />
                </div>
                <span className="font-medium">{answer?.title}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}
