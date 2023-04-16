const getFormattedDate = (timestamp) => {
  const d = new Date(timestamp)
  const day = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  return `${day}/${month}/${year} at ${d.toLocaleTimeString()}`
}

export default getFormattedDate
