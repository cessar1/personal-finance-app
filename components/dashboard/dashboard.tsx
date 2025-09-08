'use client'
import { CreditCard, TrendingUp } from 'lucide-react'
import { InvestmentsSection } from '../investments-section'
import { ExpensesSection } from '../expenses-section'
import { Tabs } from '@/components/dashboard/tabs'
import { type Investment, type Expense } from '@/types'

interface DashboardProps {
  expenses: Expense[]
  investments: Investment[]
}

export function Dashboard({ expenses, investments }: DashboardProps) {

  console.log(JSON.stringify(expenses, null, 2))
  console.log(JSON.stringify(investments, null, 2))
  const dashboardTabs = [
    {
      id: 'expenses',
      label: 'Gastos',
      icon: <CreditCard className="w-4 h-4" />,
      content: <ExpensesSection expenses={expenses} />,
    },
    {
      id: 'investments',
      label: 'Inversiones',
      icon: <TrendingUp className="w-4 h-4" />,
      content: <InvestmentsSection investments={investments} />,
    },
  ]

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6 w-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Tabs tabs={dashboardTabs} defaultTab="expenses" className="w-full" />
    </div>
  )

}
