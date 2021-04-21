export const secondsToHHMMSS = (givenSeconds: number) => {
  const numberOfSeconds = parseInt(givenSeconds.toString(), 10)
  const hours = Math.floor(numberOfSeconds / 3600)
  const minutes = Math.floor(numberOfSeconds / 60) % 60
  const seconds = numberOfSeconds % 60

  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== '00' || index > 0)
    .join(':')
    .replace(/^0/, '')
}
