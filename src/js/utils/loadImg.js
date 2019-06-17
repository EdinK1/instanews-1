export default path =>
  new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve({path, status: 'success'})
    img.onerror = () => resolve({path, status: 'error'})

    img.src = path
  })
