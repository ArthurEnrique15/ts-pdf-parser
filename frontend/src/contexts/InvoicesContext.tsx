import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'

export type Invoice = {
  id: string
  numero_cliente: string
  mes_ref_string: string
  mes_ref: number
  ano_ref: number
  data_vencimento: string
  energia_eletrica_kwh: number
  energia_eletrica_preco_unit: number
  energia_eletrica_valor: number
  energia_injetada_kwh: number
  energia_injetada_preco_unit: number
  energia_injetada_valor: number
  en_comp_sem_icms_kwh: number
  en_comp_sem_icms_preco_unit: number
  en_comp_sem_icms_valor: number
  contrib_ilum_publica: number
  valor_total: number
  created_at: Date
}

type InvoiceTable = {
  numero_cliente: string
  jan: string | null
  fev: string | null
  mar: string | null
  abr: string | null
  mai: string | null
  jun: string | null
  jul: string | null
  ago: string | null
  set: string | null
  out: string | null
  nov: string | null
  dez: string | null
}

interface InvoicesContextType {
  invoices: Invoice[]
  fetchInvoices(): Promise<void>
  getYears(): number[]
  formatToTable(yearFilter: number): InvoiceTable[]
  addInvoice(invoice: Invoice): void
}

interface InvoicesProviderProps {
  children: ReactNode
}

export const InvoicesContext = createContext({} as InvoicesContextType)

export function InvoicesProvider({ children }: InvoicesProviderProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const fetchInvoices = useCallback(async () => {
    const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/`)

    if (response.status === 200) {
      setInvoices(response.data)
    }
  }, [])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const getYears = () => {
    const allYears = invoices.map((invoice) => {
      return invoice.ano_ref
    })

    const uniqueYears = [...new Set(allYears)]

    uniqueYears.sort()

    return uniqueYears
  }

  const formatToTable = (yearFilter: number): InvoiceTable[] => {
    const allCustomers = invoices.map((invoice) => {
      return invoice.numero_cliente
    })

    const uniqueCustomers = [...new Set(allCustomers)]

    const table = uniqueCustomers.map((customer) => {
      const invoice = invoices.filter(
        (invoice) => invoice.numero_cliente === customer,
      )

      const invoiceTable: InvoiceTable = {
        numero_cliente: customer,
        jan: null,
        fev: null,
        mar: null,
        abr: null,
        mai: null,
        jun: null,
        jul: null,
        ago: null,
        set: null,
        out: null,
        nov: null,
        dez: null,
      }

      invoice.forEach((invoice) => {
        const month = invoice.mes_ref_string.slice(0, 3).toLowerCase()
        const year = invoice.ano_ref

        if (year === yearFilter) {
          invoiceTable[month as keyof typeof invoiceTable] = invoice.id
        }
      })

      return invoiceTable
    })

    return table
  }

  const addInvoice = async (invoice: Invoice) => {
    setInvoices([...invoices, invoice])
  }

  return (
    <InvoicesContext.Provider
      value={{ invoices, fetchInvoices, getYears, formatToTable, addInvoice }}
    >
      {children}
    </InvoicesContext.Provider>
  )
}
