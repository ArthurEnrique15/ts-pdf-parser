import { useContext, useEffect, useState } from 'react'
import {
  InvoicesHistoryContainer,
  TableButton,
  YearButtonsContainer,
  YearButton,
} from './styles'
import { InvoicesContext } from '../../contexts/InvoicesContext'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { months } from '../../constants/months'
import { FilePdf } from '@phosphor-icons/react'
import { api } from '../../lib/axios'

type DownloadClickProps = {
  id: string
  numero_cliente: string
  month: string
}

export function InvoicesHistory() {
  const { getYears, formatToTable } = useContext(InvoicesContext)

  const [activeYear, setActiveYear] = useState(0)

  const years = getYears()

  const formattedRows = formatToTable(activeYear)

  const handleChangeActiveYear = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const eventTarget = event.target as HTMLInputElement
    const newYear = Number(eventTarget.innerText)

    if (newYear !== activeYear) {
      setActiveYear(newYear)
    }
  }

  const handleDownloadClick = (props: DownloadClickProps) => {
    const confirmed = window.confirm('Deseja baixar o arquivo?')
    if (confirmed) {
      downloadFile(props)
    }
  }

  const downloadFile = async ({
    id,
    numero_cliente,
    month,
  }: DownloadClickProps) => {
    try {
      const response = await api.get('http://localhost:3333/download', {
        headers: { id },
        responseType: 'blob',
      })

      const blob = new Blob([response.data], { type: 'application/pdf' })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      link.setAttribute(
        'download',
        `${numero_cliente}-${month}-${activeYear}.pdf`,
      )
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading the file:', error)
      alert('Erro ao baixar o arquivo')
    }
  }

  useEffect(() => {
    const years = getYears()
    setActiveYear(years[0])
  }, [getYears])

  return (
    <InvoicesHistoryContainer>
      <YearButtonsContainer>
        {years.map((year) => {
          return (
            <YearButton
              key={year}
              selected={activeYear === year}
              onClick={handleChangeActiveYear}
            >
              {year}
            </YearButton>
          )
        })}
      </YearButtonsContainer>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Número do cliente</TableCell>
              {months.map((month) => {
                return (
                  <TableCell align="center" key={month}>
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedRows.map((row) => (
              <TableRow
                key={row.numero_cliente}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.numero_cliente}
                </TableCell>
                {months.map((month) => {
                  return (
                    <TableCell align="center" key={month}>
                      {row[month as keyof typeof row] ? (
                        <TableButton
                          onClick={() =>
                            handleDownloadClick({
                              id: row[month as keyof typeof row] || '',
                              numero_cliente: row.numero_cliente,
                              month,
                            })
                          }
                        >
                          <FilePdf size={24} />
                        </TableButton>
                      ) : (
                        <TableButton disabled>
                          <FilePdf size={24} />
                        </TableButton>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InvoicesHistoryContainer>
  )
}
