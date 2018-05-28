export default (value) => {
  return value.sort((a, b) => b.date.seconds - a.date.seconds)
}
