export default (value) => {
  const date = new Date(value.seconds * 1000)
  return date.toLocaleString(['fr-FR'], {month: 'short', day: '2-digit', year: 'numeric'})
}
