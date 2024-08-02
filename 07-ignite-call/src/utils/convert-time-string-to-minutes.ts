const ONE_HOUR_IN_MINUTES = 60

export function convertTimeStringToMinutes(timeString: string) {
  const [hour, minutes] = timeString.split(':').map(Number)

  return hour * ONE_HOUR_IN_MINUTES + minutes
}
