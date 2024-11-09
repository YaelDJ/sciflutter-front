export const formatDate = (date: string): string => {
  const dateFormater = new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return dateFormater.format(new Date(date))
}

export const getMonth = (date: string): string => {
  const dateFormater = new Intl.DateTimeFormat("es-MX", {
    month: "long"
  });

  return dateFormater.format(new Date(date));
}

export const getDay = (date: string): string => {
  const dateFormater = new Intl.DateTimeFormat("es-MX", {
    day: "2-digit"
  });

  return dateFormater.format(new Date(date));
}

export const formatLongDate = (date: string): string => {
  const dateObj = new Date(date)

  return `${getDay(date)} de ${getMonth(date)} ${dateObj.getFullYear()}`
}