import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

import styles from './Chrono.module.scss'

const Chrono = ({ timeToShow }: { timeToShow: number }) => {
  const [time, setTime] = useState(timeToShow)

  useEffect(() => {
    setInterval(() => {
      setTime((oldVal) => {
        if (oldVal >= 1) {
          return oldVal - 1
        } else {
          return 0
        }
      })
    }, 1000)
  }, [])

  return (
    <div className={styles.chrono}>
      <StyledCount timeToShow={timeToShow}>{time}</StyledCount>
      <LeftHalf timeToShow={timeToShow} />
      <RightHalf timeToShow={timeToShow} />
    </div>
  )
}

export default Chrono

const lRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(-180deg);
  }
`

const rRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-180deg);
  }
`

const fadeout = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`

const StyledCount = styled.span<{ timeToShow: number }>`
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: 800;
  font-size: 16px;
  font-family: Helvetica;
  color: #fff;
  z-index: 2;
  animation: ${fadeout} 0.5s ${({ timeToShow }) => timeToShow && timeToShow + 1 + 's'};
  animation-fill-mode: forwards;
`

const LeftHalf = styled.div<{ timeToShow: number }>`
  float: left;
  width: 50%;
  height: 100%;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 8px solid rgb(232, 45, 45);
    animation-duration: ${({ timeToShow }) => timeToShow && timeToShow + 's'};
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    border-right: none;
    border-top-left-radius: 999px;
    border-bottom-left-radius: 999px;
    transform-origin: center right;
    animation-name: ${lRotate};
  }
`

const RightHalf = styled.div<{ timeToShow: number }>`
  float: left;
  width: 50%;
  height: 100%;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 8px solid rgb(232, 45, 45);
    animation-duration: ${({ timeToShow }) => timeToShow && timeToShow + 's'};
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    border-left: none;
    border-top-right-radius: 999px;
    border-bottom-right-radius: 999px;
    transform-origin: center left;
    animation-name: ${rRotate};
  }
`
