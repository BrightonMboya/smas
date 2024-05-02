import {CurrencyDollar, ShoppingCart, Tag, Users, Cash, CurrencyDollarSolid }from "@medusajs/icons"
import { NavItem } from "./nav-item"

const MainLayout = () => {
    return (
        <>
        <MainSidebar/>
        </>
    )
}


export const MainSidebar = () => {
  return (
    <aside className="flex flex-1 flex-col justify-between overflow-y-auto">
      <div className="flex flex-1 flex-col">
        <div className="bg-ui-bg-subtle sticky top-0">
          {/* <Header /> */}
          <div className="px-3">
            <div className="border-ui-border-strong h-px w-full border-b border-dashed" />
          </div>
        </div>
        <CoreRouteSection />
      </div>
    </aside>
  )
}


const CoreRouteSection = () => {

  return (
    <nav className="flex flex-col gap-y-4 py-2">
      {coreRoutes.map((route) => {
        return <NavItem key={route.to} {...route} />
      })}
    </nav>
  )
}
const coreRoutes = [
    {
        id: 1,
        name: "Products",
        to: "/dashboard/products",
        icon: <Tag/>
    },
    {
        id: 2,
        name: "Sales",
        to: "/dashboard/sales",
        icon: <ShoppingCart/>
    },
    {
        id: 3,
        name: "Suppliers",
        to: "/dashboard/suppliers",
        icon: <Users/>
    },
    {
        id: 4,
        name: "Sales",
        to: "/dashboard/sales",
        icon: <CurrencyDollar/>
    },
    {
        id: 5,
        name: "Expenses",
        to: "/dashboard/expenses",
        icon: <Cash/>
    },
    {
        id: 6,
        name: "Debts",
        to: "/dashboard/debts",
        icon: <CurrencyDollarSolid/>
    },
    // {
    //     id: 1,
    //     name: "",
    //     to: "",
    //     icon: ""
    // },
]