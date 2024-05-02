"use client";
import { Text, clx } from "@medusajs/ui"
import { useEffect, useState } from "react"
import Link from "next/link"

type ItemType = "core" | "extension";


type NestedItemProps = {
  label: string
  to: string
}

export type NavItemProps = {
  icon?: React.ReactNode
  name: string
  to: string
}

export const NavItem = ({
  icon,
  name,
  to,
 
}: NavItemProps) => {


  return (
    <div className="px-3">
      <Link
        href={to}
        className={clx(
          "text-ui-fg-subtle hover:text-ui-fg-base transition-fg hover:bg-ui-bg-subtle-hover flex items-center gap-x-2 rounded-md px-2 py-2.5 outline-none md:py-1.5",
        //   {
        //     "bg-ui-bg-base hover:bg-ui-bg-base-hover shadow-elevation-card-rest":
        //       location.pathname.startsWith(to),
        //     "max-md:hidden": items && items.length > 0,
        //   }
        )}
      >
        <Icon icon={icon} type="core" />
        <Text size="small" weight="plus" leading="compact">
          {name}
        </Text>
      </Link>
    </div>
  )
}

const Icon = ({ icon, type }: { icon?: React.ReactNode; type: ItemType }) => {
  if (!icon) {
    return null
  }

  return type === "extension" ? (
    <div className="shadow-borders-base bg-ui-bg-base flex h-5 w-5 items-center justify-center rounded-[4px]">
      <div className="h-4 w-4 overflow-hidden rounded-sm">{icon}</div>
    </div>
  ) : (
    icon
  )
}
