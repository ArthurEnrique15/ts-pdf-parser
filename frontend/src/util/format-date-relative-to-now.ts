import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Response {
  formattedDate: string
  dateRelativeToNow: string
}

export function formatDateRelativeToNow(date: Date): Response {
  const formattedDate = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const dateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  })

  return { formattedDate, dateRelativeToNow }
}
