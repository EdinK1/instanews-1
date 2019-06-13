// add query param w/o reload
export default (key, value) => {
  if (window.history.pushState)
    // FIXME: breaks browser back btn
    window.history.pushState({}, null, `?${key}=${value}`)
}
