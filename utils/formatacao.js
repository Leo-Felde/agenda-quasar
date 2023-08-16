export function formatDate(inputDate, input = true) {
  const parts = inputDate.split(input ? '-' : '/')
  let year, month, day
  
  if (input) {
    year = parts[0]
    month = parts[1]
    day = parts[2]
  } else {
    day = parts[0]
    month = parts[1]
    year = parts[2]
  }

  if (input) {
    return `${day}/${month}/${year}`
  } else {
    return `${year}-${day}-${month}`
  }
}
