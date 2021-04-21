export function getSecondsFromTimeInput(value: string) {
  const [str1, str2, str3] = value.split(':')
  const firstTimeVal = Number(str1)
  const secondTimeVal = Number(str2)
  const thirdTimeVal = Number(str3)

  if (!isNaN(firstTimeVal) && isNaN(secondTimeVal) && isNaN(thirdTimeVal)) {
    return firstTimeVal
  }

  if (!isNaN(firstTimeVal) && !isNaN(secondTimeVal) && isNaN(thirdTimeVal)) {
    return firstTimeVal * 60 + secondTimeVal
  }

  if (!isNaN(firstTimeVal) && !isNaN(secondTimeVal) && !isNaN(thirdTimeVal)) {
    return firstTimeVal * 60 * 60 + secondTimeVal * 60 + thirdTimeVal
  }

  return 0
}
