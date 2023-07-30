import React, { useContext, useState } from 'react'
import { HomeContainer, PeriodContainer } from './styles'
import { months } from '../../constants/months'
import { InvoicesContext } from '../../contexts/InvoicesContext'

export function Home() {
  const { getYears } = useContext(InvoicesContext)
  const years = getYears()

  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value)
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value)
  }

  return (
    <HomeContainer>
      <PeriodContainer>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Mês</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Ano</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </PeriodContainer>
    </HomeContainer>
  )
}
