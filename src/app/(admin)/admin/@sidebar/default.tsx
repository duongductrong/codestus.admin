import { IconButton } from "@/components/icon-button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { SIDEBAR_ITEMS } from "@/constants/admin"
import { cn } from "@/utils/tailwind"
import Link from "next/link"
import Icons from "@/components/ui/icons"
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
      {SIDEBAR_ITEMS.map(({ title, key, icon, path }, index) => (
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <IconButton key={key} active={index === 0} size="lg" forceDark asChild>
              <Link href={path}>
                <Icons name={icon} className="h-[22px] w-[22px]" />
              </Link>
            </IconButton>
          </HoverCardTrigger>
          <HoverCardContent side="right" sideOffset={8} className="w-[298px] space-y-3">
            <h2 className="mb-4 text-base font-semibold">{title}</h2>
            <h3 className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Icons name="outline.abstract.abstract-3" />
              Button
            </h3>
            <h3 className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Icons name="outline.abstract.abstract" /> Accordion
            </h3>
            <h3 className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Icons name="outline.abstract.abstract-10" /> Alert
            </h3>
            <h3 className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Icons name="outline.abstract.abstract-11" /> Avatar
            </h3>
            <h3 className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Icons name="outline.abstract.abstract-12" /> Card
            </h3>
            <h3 className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Icons name="outline.abstract.abstract-13" /> Alert dialog
            </h3>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  </aside>
)

export default AdminSidebar
