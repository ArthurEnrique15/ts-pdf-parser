import React, { useContext, useState } from 'react'
import {
  DashboardContainer,
  HomeContainer,
  NumbersContainer,
  PeriodContainer,
} from './styles'
import { months } from '../../constants/months'
import { InvoicesContext } from '../../contexts/InvoicesContext'
import { EnergyChart } from './EnergyChart'
import { Card } from './Card'

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
          <option disabled value="">
            Mês
          </option>
          {months.map((month, index) => (
            <option key={month} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        <select value={selectedYear} onChange={handleYearChange}>
          <option disabled value="">
            Ano
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </PeriodContainer>

      <DashboardContainer>
        <NumbersContainer>
          <Card
            energyType="generated"
            selectedMonth={Number(selectedMonth)}
            selectedYear={Number(selectedYear)}
          />
          <Card
            energyType="consumed"
            selectedMonth={Number(selectedMonth)}
            selectedYear={Number(selectedYear)}
          />
          <Card
            energyType="compensated"
            selectedMonth={Number(selectedMonth)}
            selectedYear={Number(selectedYear)}
          />
        </NumbersContainer>

        <EnergyChart />
      </DashboardContainer>
    </HomeContainer>
  )
}
