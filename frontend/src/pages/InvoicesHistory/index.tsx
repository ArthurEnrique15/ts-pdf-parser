import { useContext, useState } from 'react'
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

export function InvoicesHistory() {
  const { getYears, formatToTable } = useContext(InvoicesContext)
  const years = getYears()

  const [activeYear, setActiveYear] = useState(years[0])

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
                        <TableButton>
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
