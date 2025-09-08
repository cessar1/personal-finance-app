"use client"
import { useState, ReactNode } from 'react'

interface TabItem {
  id: string
  label: string
  content: ReactNode
  icon?: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-border">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">{activeTabContent}</div>
    </div>
  )
}
