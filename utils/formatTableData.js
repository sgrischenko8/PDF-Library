function formatDate(dateString) {
  const date = new Date(dateString)
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  return date.toLocaleString('ru-RU', options)
}

export function formatTableData(arr) {
  return arr.map((el) => {
    el.format = 'PDF'
    el.uploadDate = formatDate(el.uploadDate)
    el.size = (el.size / 1000).toFixed(2)
    return el
  })
}
