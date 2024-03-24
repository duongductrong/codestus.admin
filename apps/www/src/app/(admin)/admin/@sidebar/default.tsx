"use client"

/* eslint-disable jsx-a11y/control-has-associated-label */
import { PanelLeft } from "lucide-react"
import Link from "next/link"
import Icons from "../../../../components/ui/icons"
import { List, ListItem, ListItemContent, ListItemTrigger } from "../../../../components/ui/list"
import { SIDEBAR_ITEMS } from "../../../../constants/admin"
import { cn } from "../../../../libs/utils/tailwind"

import SidebarLogo from "./_components/sidebar-logo"

export interface AdminSidebarProps {}

const AdminSidebar = (props: AdminSidebarProps) => (
  <aside
    className={cn(
      "border-r",
      "fixed left-0 top-0 z-20",
      "h-lvh w-sidebar-size bg-background",
      "transition-width flex flex-col overflow-hidden duration-300 ease-out",
    )}
  >
    <div className={cn("flex items-center gap-3 px-4 py-3 font-bold", "border-b bg-background")}>
      <span className="flex items-center gap-3 text-sm">
        <SidebarLogo /> ACME
      </span>
      <button
        type="button"
        className="ml-auto cursor-pointer"
        onClick={() => document.documentElement.style.setProperty("--sidebar-size", "60px")}
      >
        <PanelLeft className="h-4.5 w-4.5" />
      </button>
    </div>

    <div className="flex h-full flex-col px-0 py-3">
      {SIDEBAR_ITEMS.map(({ title, key, icon, path, children }, index) => {
        const hasChildrenItems = children?.length

        return (
          <List key={key} type="multiple">
            {hasChildrenItems ? (
              <ListItem>
                <ListItemTrigger disabled={!hasChildrenItems}>{title}</ListItemTrigger>

                <ListItemContent>
                  {children?.map((childItem) => {
                    const nestedChildren = childItem.children
                    return nestedChildren?.length ? (
                      <ListItem>
                        <ListItemTrigger>{childItem.title}</ListItemTrigger>
                        <ListItemContent>
                          {nestedChildren.map((nestedChildItem) => (
                            <ListItem
                              as={Link}
                              href={nestedChildItem.path}
                              startIcon={
                                nestedChildItem.icon ? (
                                  <Icons name={nestedChildItem.icon} />
                                ) : undefined
                              }
                            >
                              {nestedChildItem.title}
                            </ListItem>
                          ))}
                        </ListItemContent>
                      </ListItem>
                    ) : (
                      <ListItem as={Link} href={childItem.path}>
                        {childItem.title}
                      </ListItem>
                    )
                  })}
                </ListItemContent>
              </ListItem>
            ) : (
              <ListItem as={Link} href={path}>
                {title}
              </ListItem>
            )}
          </List>
        )
      })}
    </div>
  </aside>
)

export default AdminSidebar
