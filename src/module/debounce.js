let debounce = null
export default (callback=() => {}, interval=300) => {
  clearTimeout(debounce)
  debounce = setTimeout(() => {
    callback()
  }, interval)
}