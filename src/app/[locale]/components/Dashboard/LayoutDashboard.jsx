import React from 'react'
import DashboardNav from "../Nav/DashboardNav"

const LayoutDashboard = ({t}) => {
  return (
    <div className="flex flex-col space-y-6 mt-10 ">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav t={t.Dashboard} />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default LayoutDashboard