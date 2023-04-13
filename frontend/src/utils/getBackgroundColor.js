const getBackgroundColor = (response) => {
  if (response) {
    const { status } = response
    switch (status) {
      case 'ok':
        return 'rgb(25, 135, 65)'
      case 'error':
        return 'rgb(220, 0, 0)'
      default:
        return 'rgb(200, 180, 0)'
    }
  }
}

export default getBackgroundColor
