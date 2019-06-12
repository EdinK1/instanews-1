// add section as query param w/o reload
export default query => {
  if (window.history.pushState)
    // FIXME: breaks browser back btn
    window.history.pushState({}, null, `?section=${query}`)
}
