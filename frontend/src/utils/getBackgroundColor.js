const getBackgroundColor = (response) => {
  console.log(response)
  if (response) {
    const { status } = response
    console.log(status)
    switch (status) {
      case 'ok':
        return 'rgb(0, 220, 0)'
      case 'error':
        return 'rgb(220, 0, 0)'
      default:
        return 'rgb(220, 200, 0)'
    }
  }
}

export default getBackgroundColor
