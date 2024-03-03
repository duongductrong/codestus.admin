import { IconButton } from "@/components/icon-button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import Icons from "@/components/ui/icons"
import { List, ListItem, ListItemContent, ListItemTrigger } from "@/components/ui/list"
import { ToolTipProps, Tooltip } from "@/components/ui/tooltip"
import { SIDEBAR_ITEMS } from "@/constants/admin"
import { cn } from "@/utils/tailwind"
import Link from "next/link"
import { Fragment } from "react"
import SidebarLogo from "./_components/sidebar-logo"

export interface AdminSidebarProps {}

const AdminSidebar = (props: AdminSidebarProps) => (
  <aside
    className={cn(
      "fixed left-0 top-0",
      "h-lvh w-app-sidebar-dimension bg-app-sidebar-background",
      "border-r border-accent-darkness",
      "flex flex-col items-center overflow-hidden",
    )}
  >
    <div
      className={cn(
        "size-app-sidebar-dimension",
        "border-b border-accent-darkness bg-app-sidebar-background",
        "mb-4 flex shrink-0 items-center justify-center",
      )}
    >
      <SidebarLogo />
    </div>

    <div className="flex h-full flex-col gap-3 p-2">
      {SIDEBAR_ITEMS.map(({ title, key, icon, path, children }, index) => {
        const hasChildrenItems = !!children?.length
        const MaybeTooltip = hasChildrenItems ? Fragment : (Tooltip as any)
        const maybeTooltipProps = hasChildrenItems
          ? {}
          : ({
              content: title,
              contentProps: { align: "center", side: "right" },
            } as Omit<ToolTipProps, "children">)

        return (
          <HoverCard key={key} openDelay={0}>
            <HoverCardTrigger asChild>
              <MaybeTooltip {...maybeTooltipProps}>
                <IconButton key={key} active={index === 0} size="lg" forceDark asChild>
                  <Link href={path}>
                    <Icons name={icon} className="h-[22px] w-[22px]" />
                  </Link>
                </IconButton>
              </MaybeTooltip>
            </HoverCardTrigger>
            {hasChildrenItems ? (
              <HoverCardContent side="right" sideOffset={16} className="mt-2 w-[298px] space-y-3">
                <h2 className="text-base font-medium">{title}</h2>
                {hasChildrenItems ? (
                  <List type="multiple">
                    {children.map((childItem) => {
                      const nestedChildren = childItem.children
                      return (
                        <ListItem
                          as={Link}
                          href={childItem.path}
                          startIcon={<Icons name={childItem.icon} />}
                        >
                          {nestedChildren?.length ? (
                            <>
                              <ListItemTrigger>{childItem.title}</ListItemTrigger>
                              <ListItemContent>
                                {nestedChildren.map((nestedChildItem) => (
                                  <ListItem
                                    as={Link}
                                    href={childItem.path}
                                    startIcon={<Icons name={nestedChildItem.icon} />}
                                  >
                                    {nestedChildItem.title}
                                  </ListItem>
                                ))}
                              </ListItemContent>
                            </>
                          ) : (
                            childItem.title
                          )}
                        </ListItem>
                      )
                    })}
                  </List>
                ) : null}
              </HoverCardContent>
            ) : null}
          </HoverCard>
        )
      })}
    </div>
  </aside>
)

export default AdminSidebar
